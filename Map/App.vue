<template>
  <v-app>
    <v-main>
      <div
        style="
          position: relative;
          background-image: url('https://cdn0.scrvt.com/a534b4b72e47031e7c1755abc55cf709/9d3cfd1d9ecd8bfe/2cf83d1df7d2/v/6909d8130b23/uni-bayreuth-pm-110-campus-sonnenuntergang.jpg');
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
          "
        ></div>

        <!-- Header -->
        <header
          style="background-color: rgba(0, 0, 0, 0.8); color: white; text-align: center; padding: 20px 0; position: absolute; top: 0; width: 100%; z-index: 2; height: 10%;"
        >
          <h1>Pendlr</h1>
        </header>

        <!-- Interaktive Karte -->
        <div
          id="map"
          style="position: absolute; top: 10%; bottom: 22%; width: 100%; z-index: 2;"
        ></div>

        <!-- Buttons für Start und Ende -->
        <div
  style="position: absolute; bottom: 25%; left: 0%; z-index: 3; display: flex; flex-direction: column; gap: 10px;"
>
          <button @click="setStartPoint" style="padding: 10px; background: #333; color: white; border: none; cursor: pointer;">Set Start</button>
          <button @click="setEndPoint" style="padding: 10px; background: #333; color: white; border: none; cursor: pointer;">Set End</button>
        </div>

        <!-- Button für Favoriten -->
        <div
          v-if="showFavorites"
          style="position: absolute; bottom: 40%; left: 0%; z-index: 3; width: 300px; background: rgba(0, 0, 0, 0.8); color: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3>Favoriten</h3>
            <button @click="showFavorites = false" style="background: transparent; color: white; border: none; cursor: pointer;">X</button>
          </div>
          <ul style="list-style: none; padding: 0;">
            <li v-for="(fav, index) in favorites" :key="index" style="margin-bottom: 10px;">
              <button @click="goToFavorite(fav)" style="background: #444; color: white; border: none; cursor: pointer; width: 100%; text-align: left; padding: 5px;">{{ fav.name }}</button>
            </li>
          </ul>
          <button @click="addFavorite" style="margin-top: 10px; background: #555; color: white; padding: 10px; border: none; cursor: pointer; width: 100%;">Favorit hinzufügen</button>
        </div>

        <!-- Favoriten-Button -->
        <button
          v-if="!showFavorites"
          @click="showFavorites = true"
          style="position: absolute; bottom: 40%; left: 0%; z-index: 3; background: #333; padding: 10px; border: none; color: white; cursor: pointer;"
        >
          Favoriten
        </button>

        <!-- Button für aktuellen Standort -->
        <div
  style="position: absolute; bottom: 27%; right: 5%; z-index: 3; background: #333; padding: 10px; border: none; color: white; cursor: pointer;"
>
  <button @click="zoomToCurrentLocation">Live Location</button>
</div>
<!-- Maximierbutton im Template -->
<button
  v-if="showMaximizeButton"
  @click="maximizeRouteContainer"
  style="position: absolute; top: 100px; right: 10px; background: #333; color: white; border: none; cursor: pointer; padding: 10px; border-radius: 10px; z-index: 9999;"
>
  Route Anzeigen
</button>

<div
  v-if="routeInfo"
  style="position: fixed; bottom: 20%; left: 50%; transform: translateX(-50%); z-index: 9999; background: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);"
>
  <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
    <!-- Start- und Endadresse -->
    <div>
      <h4 style="margin: 0;">Start: {{ routeInfo.startAddress }}</h4>
      <h4 style="margin: 0;">Ende: {{ routeInfo.endAddress }}</h4>
      <p style="margin: 0; color: lightgray;">Entfernung: {{ routeInfo.distance }} km</p>
    </div>

    <!-- Grüne Pfeil-Box -->
    <div
      style="
        background: green;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
      "
      @click="handleRouteConfirmation"
    >
      <span style="font-size: 24px; color: white;">→</span>
    </div>
  </div>
</div>

        <!-- Fußzeile -->
        <footer
          style="background-color: rgba(0, 0, 0, 0.8); color: white; text-align: center; padding: 20px 0; position: absolute; bottom: 0; width: 100%; z-index: 2; height: 22%;"
        >
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px">
            <!-- Rechtliches -->
            <div style="text-align: left;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Rechtliches</h2>
              <p>
                <a href="#datenschutz" style="color: white; text-decoration: none;">Datenschutz</a>
              </p>
              <p>
                <a href="#agb" style="color: white; text-decoration: none;">AGB</a>
              </p>
            </div>

            <!-- Social -->
            <div style="text-align: center;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Social</h2>
              <p>
                <a
                  href="https://www.instagram.com/pendlr_?igsh=ejU2cXlyc25zZWk4"
                  style="color: white; text-decoration: none;"
                  >Instagram</a
                >
              </p>
              <p><a href="#youtube" style="color: white; text-decoration: none;">YouTube</a></p>
            </div>

            <!-- Weitere -->
            <div style="text-align: right;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Weitere</h2>
              <p><a href="#faq" style="color: white; text-decoration: none;">FAQ</a></p>
              <p><a href="#kontakt" style="color: white; text-decoration: none;">Kontakt</a></p>
            </div>
          </div>

          <!-- Copyright -->
          <p style="margin-top: 20px;">© 2024 Universität Bayreuth, Alle Rechte vorbehalten</p>
        </footer>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// Leaflet und Leaflet Routing Machine importieren
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import '@petoc/leaflet-double-touch-drag-zoom';
import 'leaflet/dist/leaflet.css';
import '@petoc/leaflet-double-touch-drag-zoom/src/leaflet-double-touch-drag-zoom.css';
import "leaflet-extra-markers";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import axios from 'axios'; // Axios für HTTP-Anfragen

export default {
  name: 'App',
  data() {
    return {
      startLatLng: null, // Startpunkt
      endLatLng: null, // Endpunkt
      map: null,
      routeControl: null, // Routing Control
      geocoder: null, // Geocoder
      openCageApiKey: 'b0981ea1ad8f4cfdbfd74181a5befc2a', // Dein OpenCage API-Schlüssel
      defaultLatLng: [49.9422, 11.5765], // Standardstandort (Uni Bayreuth)
      favorites: [
        { name: 'Bayreuth Hauptcampus', coords: [49.92875986327442, 11.585825809323136] },
        { name: 'Kulmbach Campus', coords: [50.10860928367846, 11.451081236256684] },
      ],
      showFavorites: false,
      showMaximizeButton: false, // Neuer Zustand für den Maximierbutton
      routeInfo: null, // Routeninformationen
      currentLocationMarker: null,
      startMarker: null,
      endMarker: null,
      searchMarker: null
    };
  },
  mounted() {
    this.askForLocationPermission();
},
  
  methods: {
    // Geocoder-Funktion mit OpenCage API
    async geocodeAddress(query) {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json", {
            params: {
              q: query,
              key: this.openCageApiKey,
              language: 'de',
            }
          }
        );

        const result = response.data.results[0];
        if (result) {
          const lat = result.geometry.lat;
          const lng = result.geometry.lng;
          return [lat, lng]; // Rückgabe der Koordinaten
        }
        return null; // Wenn keine Ergebnisse gefunden werden
      } catch (error) {
        console.error("Geocoding failed:", error);
        return null;
      }
    },

    askForLocationPermission() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Standort erfolgreich abgerufen
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('Standort erfolgreich abgerufen:', lat, lng);
        
        // Karte mit dem aktuellen Standort initialisieren
        this.initMap(lat, lng);
        
       // Setze den aktuellen Standort mit ExtraMarkers
       if (this.currentLocationMarker) {
              this.map.removeLayer(this.currentLocationMarker);
            }
            const userLocationIcon = L.ExtraMarkers.icon({
              icon: 'fa fa-location-arrow',
              markerColor: 'blue',
              shape: 'circle',
              prefix: 'fa',
              iconColor: 'white'
            });
            this.currentLocationMarker = L.marker([lat, lng], { icon: userLocationIcon })
              .addTo(this.map)
              .bindPopup('Aktueller Standort')
          .openPopup();  // Popup direkt öffnen
      },
      (error) => {
        // Fehlerbehandlung bei der Standortabfrage
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('Standortabfrage wurde vom Benutzer verweigert');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Standort nicht verfügbar');
            break;
          case error.TIMEOUT:
            console.error('Standortabfrage hat zu lange gedauert');
            break;
          default:
            console.error('Unbekannter Fehler bei der Standortabfrage:', error);
        }
        // Standard-Standort (Uni Bayreuth) setzen, falls Standortabfrage fehlschlägt
        this.initMap(this.defaultLatLng[0], this.defaultLatLng[1]);
      }
    );
  } else {
    console.error("Geolocation wird in diesem Browser nicht unterstützt.");
    this.initMap(this.defaultLatLng[0], this.defaultLatLng[1]);
  }
},

    initMap(lat, lng) {
  // Karte mit Leaflet und OpenStreetMap initialisieren
  if (!this.map) { // Karte nur einmal initialisieren
    this.map = L.map('map').setView([lat, lng], 13, {doubleTouchDragZoom: true}); // Karte zentrieren und zoomen

  // OpenStreetMap TileLayer hinzufügen
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.map);

  // Standard-Zoomkontrollen oben links entfernen
  this.map.zoomControl.setPosition('bottomright'); // Position auf 'bottomright' setzen

  // Geocoder (Suchleiste oben links) hinzufügen
  const geocoderControl = L.Control.geocoder({
    position: 'topleft',
    placeholder: 'Suche einen Ort...',
    errorMessage: 'Ort nicht gefunden',
  }).addTo(this.map);  // Geocoder korrekt hinzufügen

  // Bei Suchergebnis: Marker setzen
  geocoderControl.on('markgeocode', (e) => {
          const center = e.geocode.center;
          // Entferne alten Suchmarker, falls vorhanden
          if (this.searchMarker) {
            this.map.removeLayer(this.searchMarker);
          }
          const searchIcon = L.ExtraMarkers.icon({
            icon: 'fa fa-map-pin',
            markerColor: 'purple',
            shape: 'square',
            prefix: 'fa',
            iconColor: 'white'
          });
          this.searchMarker = L.marker(center, { icon: searchIcon })
            .addTo(this.map)
            .bindPopup(e.geocode.name)
            .openPopup();
          this.map.setView(center, 15);
        });

  this.displayFavoritesOnMap(); // Favoriten beim Laden anzeigen

  
}
    },

    setStartPoint() {
      this.map.once('click', (e) => {
        this.startLatLng = e.latlng;
        // Setze Startpunkt-Marker mit ExtraMarkers
        const startIcon = L.ExtraMarkers.icon({
          icon: 'fa fa-play',
          markerColor: 'green',
          shape: 'circle',
          prefix: 'fa',
          iconColor: 'white'
        });
        if (this.startMarker) {
          this.map.removeLayer(this.startMarker);
        }
        this.startMarker = L.marker(this.startLatLng, { icon: startIcon })
          .addTo(this.map)
          .bindPopup('Startpunkt')
          .openPopup();
        this.updateRoute();
      });
    },
    setEndPoint() {
      this.map.once('click', (e) => {
        this.endLatLng = e.latlng;
         // Setze Endpunkt-Marker mit ExtraMarkers
         const endIcon = L.ExtraMarkers.icon({
          icon: 'fa fa-flag-checkered',
          markerColor: 'red',
          shape: 'penta',
          prefix: 'fa',
          iconColor: 'white'
        });
        if (this.endMarker) {
          this.map.removeLayer(this.endMarker);
        }
        this.endMarker = L.marker(this.endLatLng, { icon: endIcon })
          .addTo(this.map)
          .bindPopup('Endpunkt')
          .openPopup();
        this.updateRoute();
      });
    },
    updateRoute() {
      if (this.startLatLng && this.endLatLng) {
        // Routing nur starten, wenn beide Punkte gesetzt sind
        if (this.routeControl) {
          this.routeControl.setWaypoints([this.startLatLng, this.endLatLng]);
        } else {
          // Neue Route mit Leaflet Routing Machine
          this.routeControl = L.Routing.control({
            waypoints: [this.startLatLng, this.endLatLng],
            routeWhileDragging: true,
          })
          .on('routesfound', (e) => {
        const route = e.routes[0]; // Die erste Route
        this.routeInfo = {
          startAddress: 'Startadresse', // Optional: Du kannst hier Geocoding verwenden
          endAddress: 'Endadresse',   // Optional: Du kannst hier Geocoding verwenden
          distance: (route.summary.totalDistance / 1000).toFixed(2), // Entfernung in km
        };
      })
          .addTo(this.map);
          // Warten, bis der DOM-Container erstellt ist, und dann Modifikationen vornehmen
          setTimeout(() => {
            const routeContainer = document.querySelector('.leaflet-routing-alternatives-container');
            if (routeContainer) {
              routeContainer.style.backgroundColor = '#333'; // Hintergrund schwarz
              routeContainer.style.color = 'white'; // Text weiß
              routeContainer.style.overflowY = 'auto'; // Scrollbar aktivieren
              routeContainer.style.maxHeight = '375px'; // Maximale Höhe
              routeContainer.style.width = '300px'; // Breite
              routeContainer.style.position = 'absolute';
              routeContainer.style.top = '10px'; // Position in der Ecke
              routeContainer.style.right = '10px';
              routeContainer.style.borderRadius = '10px';
              routeContainer.style.padding = '10px';
              routeContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';

              // Minimierbutton hinzufügen
              const minimizeButton = document.createElement('button');
              minimizeButton.innerText = '-';
              minimizeButton.style.position = 'absolute';
              minimizeButton.style.top = '5px';
              minimizeButton.style.right = '5px';
              minimizeButton.style.background = '#555';
              minimizeButton.style.color = 'white';
              minimizeButton.style.border = 'none';
              minimizeButton.style.cursor = 'pointer';
              minimizeButton.style.padding = '5px';
              minimizeButton.style.borderRadius = '5px';
              routeContainer.appendChild(minimizeButton);

              minimizeButton.addEventListener('click', () => {
                routeContainer.style.display = 'none';
                this.showMaximizeButton = true;
              });

              // Maximierbutton hinzufügen
              const maximizeButton = document.createElement('button');
              maximizeButton.innerText = 'Route Anzeigen';
              maximizeButton.style.position = 'absolute';
              maximizeButton.style.top = '10px';
              maximizeButton.style.right = '10px';
              maximizeButton.style.background = '#333';
              maximizeButton.style.color = 'white';
              maximizeButton.style.border = 'none';
              maximizeButton.style.cursor = 'pointer';
              maximizeButton.style.padding = '10px';
              maximizeButton.style.borderRadius = '10px';
              maximizeButton.style.display = 'none'; // Standardmäßig ausgeblendet
              maximizeButton.id = 'maximize-route';
              document.body.appendChild(maximizeButton);

              maximizeButton.addEventListener('click', () => {
                routeContainer.style.display = 'block';
                maximizeButton.style.display = 'none';
              });

              this.showMaximizeButton = false;
            }
      }, 500); // Kurz warten, damit der Container gerendert wird
        }
      }
    },
     // Diese Methode zoomt die Karte auf den aktuellen Standort
     zoomToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('Aktueller Standort:', lat, lng);
        // Karte auf den aktuellen Standort zentrieren
        this.map.setView([lat, lng], 18);
      },
      (error) => {
        console.error('Fehler beim Abrufen des Standorts:', error);
      }
    );
  } else {
    console.error("Geolocation wird in diesem Browser nicht unterstützt.");
  }
  // Favoriten auf der Karte anzeigen
  this.displayFavoritesOnMap(); // Diese Zeile hinzufügen
},

  displayFavoritesOnMap() {
    const favoriteIcon = L.ExtraMarkers.icon({
  icon: 'fa fa-star',
  markerColor: 'orange',   // Andere Farben: blue, green, red, purple, pink, darkblue, etc.
  shape: 'star',           // Alternativen: 'circle', 'square', 'penta'
  prefix: 'fa',
  iconColor: 'white'
});

    // Iteration durch die Favoritenliste und Marker setzen
    this.favorites.forEach((fav) => {
      L.marker(fav.coords, { icon: favoriteIcon })
        .addTo(this.map)
        .bindPopup(`<b>${fav.name}</b>`); // Popup mit dem Favoritennamen
    });
  },

  addFavorite() {
  this.map.once('click', (e) => {
    const name = prompt('Gib einen Namen für den Favoriten ein:');
    if (name) {
      const newFavorite = { name, coords: [e.latlng.lat, e.latlng.lng] };
      this.favorites.push(newFavorite);

      const favoriteIcon = L.ExtraMarkers.icon({
        icon: 'fa fa-star',
        markerColor: 'orange',
        shape: 'star',
        prefix: 'fa',
        iconColor: 'white'
      });

      L.marker(newFavorite.coords, { icon: favoriteIcon })
        .addTo(this.map)
        .bindPopup(`<b>${newFavorite.name}</b>`);
    }
  });
},
goToFavorite(fav) {
  this.map.setView(fav.coords, 18);
},

maximizeRouteContainer() {
  const routeContainer = document.querySelector('.leaflet-routing-alternatives-container');
  if (routeContainer) {
    routeContainer.style.display = 'block'; // Container wieder anzeigen
    this.showMaximizeButton = false; // Maximierbutton ausblenden
  }
},
handleRouteConfirmation() {
  alert('Route von ${this.routeInfo.startAddress} nach ${this.routeInfo.endAddress} wurde bestätigt!');
},
  },
};
</script>

<style scoped>
/* Zusätzliche Styles */
#map {
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.leaflet-control-geocoder {
  z-index: 10000; /* Geocoder nach vorne holen */
}

</style>