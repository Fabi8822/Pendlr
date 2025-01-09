<template>
    <v-container>
      <!-- Karte für das Echtzeit-Tracking des Fahrers -->
      <v-card outlined>
        <v-card-title>Echtzeit-Fahrzeug-Tracking</v-card-title>
        <v-card-text>
          <!-- Container für die Google Map -->
          <div ref="map" style="height: 500px; width: 100%"></div>
  
          <!-- Anzeige des Ladezustands der Karte und Standortdaten -->
          <div v-if="loading">
            Karte wird geladen... Bitte warten Sie.
          </div>
          <div v-else-if="location">
            <p>
              Aktueller Standort des Fahrers: {{ location.lat }}, {{ location.lng }}
            </p>
          </div>
          <div v-else>
            <p>Keine Standortdaten verfügbar. Bitte stellen Sie sicher, dass der Fahrer GPS aktiviert hat.</p>
          </div>
        </v-card-text>
      </v-card>
  
      <!-- Zusätzliche Informationen und Steuerung für das Tracking -->
      <v-btn @click="startTracking" color="primary">Tracking Starten</v-btn>
      <v-btn @click="stopTracking" color="error" :disabled="!isTracking">Tracking Stoppen</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        map: null, // Speichert das Google Maps Objekt
        marker: null, // Speichert den Marker des Fahrers auf der Karte
        loading: true, // Zustand, ob die Karte noch geladen wird
        location: null, // Speichert die aktuellen Standortdaten des Fahrers
        isTracking: false, // Überprüft, ob das Tracking aktiv ist
        trackingInterval: null, // Intervall-Referenz für das Abrufen von Standortdaten
      };
    },
    methods: {
      /**
       * Diese Methode initialisiert die Google Map und platziert einen Marker für den Fahrer.
       * Sie wird beim Laden der Seite aufgerufen.
       */
      initMap() {
        // Beispiel: Initialer Mittelpunkt der Karte (Bayreuth)
        this.map = new google.maps.Map(this.$refs.map, {
          center: { lat: 49.944, lng: 11.572 },
          zoom: 14,
        });
  
        // Initialer Marker (Fahrer)
        this.marker = new google.maps.Marker({
          position: { lat: 49.944, lng: 11.572 }, // Beispielkoordinaten
          map: this.map,
          title: "Fahrer",
        });
  
        // Ändern des Ladezustands
        this.loading = false;
      },
  
      /**
       * Diese Methode wird verwendet, um den Standort des Fahrers abzurufen.
       * Sie simuliert ein Abrufen von Daten (diese Methode wird später durch eine API ersetzt).
       */
      async fetchLocation() {
        try {
          // Beispiel: API-Aufruf, um den aktuellen Standort des Fahrers zu bekommen (z. B. über ein Backend)
          const response = await fetch("http://localhost:3000/driver/location");
          const data = await response.json();
  
          // Standortdaten setzen
          this.location = {
            lat: data.lat,
            lng: data.lng,
          };
  
          // Marker auf der Karte aktualisieren
          this.updateMarker(this.location);
        } catch (error) {
          console.error("Fehler beim Abrufen des Standorts:", error);
        }
      },
  
      /**
       * Diese Methode aktualisiert den Marker auf der Karte mit den neuen Standortdaten.
       */
      updateMarker(location) {
        if (this.marker) {
          // Setze die Position des Markers
          this.marker.setPosition({
            lat: location.lat,
            lng: location.lng,
          });
          // Setze das Zentrum der Karte auf den neuen Standort des Fahrers
          this.map.setCenter({
            lat: location.lat,
            lng: location.lng,
          });
        }
      },
    /*global google*/

      /**
       * Diese Methode startet das Echtzeit-Tracking des Fahrers, indem sie alle 30 Sekunden den Standort abruft.
       */
      startTracking() {
        // Überprüfen, ob das Tracking bereits läuft
        if (this.isTracking) return;
  
        // Tracking aktivieren
        this.isTracking = true;
  
        // Starten des Abrufs der Standortdaten alle 30 Sekunden
        this.trackingInterval = setInterval(() => {
          this.fetchLocation();
        }, 30000); // Alle 30 Sekunden wird der Standort des Fahrers abgerufen
      },
  
      /**
       * Diese Methode stoppt das Echtzeit-Tracking des Fahrers.
       */
      stopTracking() {
        // Wenn das Tracking nicht aktiv ist, tue nichts
        if (!this.isTracking) return;
  
        // Tracking stoppen und Intervall löschen
        clearInterval(this.trackingInterval);
        this.isTracking = false;
      },
    },
    mounted() {
      // Initialisiere die Karte, wenn die Komponente gemountet wird
      this.initMap();
    },
  };
  </script>
  
  <style scoped>
  /* Optionaler Stil für die Karte */
  v-card {
    margin: 20px auto;
    max-width: 700px;
  }
  </style>
  