<template>
  <v-container>
    <!-- Hauptcontainer für die Karte -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Hauptkarte mit Styling für Kennzeichen und Fahrtzeit -->
        <v-card class="elevation-12 rounded-lg shadow-2xl">
          <v-card-title class="headline primary--text text-center">
            <v-icon class="mr-2">mdi-car</v-icon> Fahrer- und Kennzeichen-Info
          </v-card-title>
          <v-card-text>
            <!-- Ladezustand -->
            <div v-if="loading" class="text-center">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
              <p>Lade Fahrtdetails...</p>
            </div>

            <!-- Anzeige der Fahrtdetails -->
            <div v-else>
              <div v-if="timeToArrival > 10">
                <!-- Wenn der Fahrer noch mehr als 10 Minuten entfernt ist -->
                <v-alert type="info" border="left" colored-border class="mt-4">
                  Der Fahrer wird in {{ timeToArrival }} Minuten ankommen. Bitte warten Sie.
                </v-alert>
              </div>
              <div v-else-if="timeToArrival > 0">
                <!-- Wenn der Fahrer in weniger als 10 Minuten ankommt -->
                <v-alert type="warning" border="left" colored-border class="mt-4">
                  <v-row align="center">
                    <v-col cols="12" md="6" class="text-center">
                      <v-img
                        src="https://via.placeholder.com/150"
                        max-width="150"
                        class="rounded-lg shadow-2xl"
                        alt="Fahrer"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-chip color="blue" dark class="headline rounded-lg" large>{{ licensePlate }}</v-chip>
                      <p>Der Fahrer wird in {{ timeToArrival }} Minuten ankommen. Bereiten Sie sich vor.</p>
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
              <div v-else>
                <!-- Wenn der Fahrer angekommen ist -->
                <v-alert type="success" border="left" colored-border class="mt-4">
                  <v-row align="center">
                    <v-col cols="12" md="6" class="text-center">
                      <v-img
                        src="https://via.placeholder.com/150"
                        max-width="150"
                        class="rounded-lg shadow-2xl"
                        alt="Fahrer angekommen"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-chip color="green" dark class="headline rounded-lg" large>{{ licensePlate }}</v-chip>
                      <p>Der Fahrer ist angekommen! Bitte suchen Sie nach dem Kennzeichen.</p>
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="fetchRideDetails" class="rounded-lg">
              <v-icon left>mdi-refresh</v-icon> Details aktualisieren
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Pop-up für die Anzeige des Kennzeichens -->
        <v-dialog v-model="showPopup" max-width="400px" transition="dialog-bottom-transition">
          <v-card class="elevation-16 rounded-lg">
            <v-card-title class="headline">Fahrer kommt bald an!</v-card-title>
            <v-card-text class="text-center">
              <v-img
                src="https://via.placeholder.com/150"
                aspect-ratio="1"
                max-height="150"
                contain
                alt="Fahrzeug"
                class="rounded-lg shadow-2xl"
              />
              <v-chip color="green" dark class="headline mt-4" large>{{ licensePlate }}</v-chip>
              <p class="mt-4">Der Fahrer ist in weniger als 10 Minuten da. Bereiten Sie sich vor.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" @click="showPopup = false" class="rounded-lg">
                Schließen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    rideId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      licensePlate: "", // Kennzeichen des Fahrers
      timeToArrival: null, // verbleibende Zeit bis zur Ankunft in Minuten
      loading: true, // Ladezustand
      intervalId: null, // Intervall-ID für Countdown
      showPopup: false, // Steuerung für das Pop-up
    };
  },
  methods: {
    // Ruft die Fahrtdetails ab
    async fetchRideDetails() {
      try {
        this.loading = true;
        const response = await axios.get(`http://localhost:3000/rides/${this.rideId}`);
        this.licensePlate = response.data.licensePlate || "Unbekannt"; // Falls das Kennzeichen nicht verfügbar ist
        this.timeToArrival = response.data.timeToArrival || 0;
        this.loading = false;
        this.checkForPopup();
      } catch (error) {
        console.error("Fehler beim Abrufen der Fahrtdetails:", error);
        this.loading = false;
      }
    },
    // Startet einen Countdown, der die verbleibende Zeit in Minuten anzeigt
    startArrivalCountdown() {
      this.intervalId = setInterval(() => {
        if (this.timeToArrival > 0) {
          this.timeToArrival -= 1;
        } else {
          clearInterval(this.intervalId);
        }
        this.checkForPopup();
      }, 60000); // Jede Minute
    },
    // Überprüft, ob das Pop-up angezeigt werden soll
    checkForPopup() {
      if (this.timeToArrival <= 10 && !this.showPopup) {
        this.showPopup = true;
      }
    },
  },
  mounted() {
    this.fetchRideDetails();
    this.startArrivalCountdown();
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style scoped>
/* Feineres Styling für Karten und Komponenten */
v-card {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

v-card-title {
  font-weight: bold;
  font-size: 1.8rem;
  color: #1976D2;
}

v-card-text {
  font-size: 1.2rem;
  color: #555;
}

v-alert {
  border-radius: 8px;
}

v-chip {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 20px;
}

v-btn {
  font-weight: bold;
  text-transform: none;
}

v-dialog .v-card {
  background-color: #f5f5f5;
  border-radius: 20px;
}

v-img {
  border-radius: 15px;
}

.v-row {
  transition: transform 0.5s ease-in-out;
}
</style>
