<template>
  <v-app>
    <v-container>
      <!-- Header -->
      <v-app-bar color="primary" dark>
        <!-- Titel der App-Bar -->
        <v-toolbar-title>Pendlr - Profil erstellen</v-toolbar-title>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="mt-5">
          <!-- Karte, um das Formular visuell hervorzuheben -->
          <v-card elevation="2" class="pa-5">
            <v-card-title>
              <!-- Titel innerhalb der Karte -->
              <h2 class="text-h5">Erstelle dein persönliches Profil bei Pendlr</h2>
            </v-card-title>
            <v-card-text>
              <!-- Formular zur Profilerstellung -->
              <v-form v-model="isFormValid" @submit.prevent="createUser">
                <!-- Eingabefeld für den Namen -->
                <v-text-field v-model="user.name" label="Name (Vor- und Nachname)" prepend-icon="mdi-account" required></v-text-field>

                <!-- Eingabefeld für die Email-Adresse mit Validierung -->
                <v-text-field
                  v-model="user.email"
                  label="Emailadresse der Universität"
                  type="email"
                  required
                  :rules="[emailRule]"
                  prepend-icon="mdi-email"
                ></v-text-field>

                <!-- Dropdown für die Auswahl der Tätigkeit -->
                <v-select
                  v-model="user.role"
                  :items="['Student', 'Mitarbeiter']"
                  label="Tätigkeit"
                  required
                ></v-select>

                <!-- Dropdown für die Auswahl der Universität -->
                <v-select
                  v-model="user.university"
                  :items="['Bayreuth', 'Kulmbach']"
                  label="Standort"
                  required
                  :item-class="universityClass"
                ></v-select>

                <!-- Eingabefeld für das Auto -->
                <v-text-field v-model="user.auto" label="Auto" required></v-text-field>

                <!-- Eingabefeld für die Musikauswahl -->
                <v-text-field
                  v-model="user.musikauswahl"
                  label="Lieblingsmusik für Fahrten"
                  required
                ></v-text-field>

                <!-- Speichern-Button, deaktiviert wenn das Formular ungültig ist -->
                <v-btn :disabled="!isFormValid" color="success" block @click="createUser">
                  <v-icon left>mdi-content-save</v-icon> <!-- Speichern Icon -->
                  Profil speichern
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
     
      </v-main>

      <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :color="snackbar.color" top>
      <v-icon left>mdi-alert-circle</v-icon> <!-- Fehler Icon -->
  {{ snackbar.message }}
</v-snackbar>


      <!-- Footer -->
      <v-footer padless color="primary" dark>
        <!-- Copyright-Hinweis -->
        <v-col class="text-center white--text py-2">
          &copy; {{ new Date().getFullYear() }} Pendlr - Alle Rechte vorbehalten
        </v-col>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
// Axios wird für API-Anfragen importiert
import axios from "axios";

export default {
  data() {
    return {
      snackbar: {
        visible: false,     //Steuerung, ob die Snackbar sichtbar ist oder nicht
        message: '',        //Die Nachricht, die in der Snackbar angezeigt wird
        timeout: 3000,      //Dauer (in ms), wie lange die Snackbar sichtbar bleibt
      },
      // Validierung des Formulars
      isFormValid: false,
      // Benutzerobjekt mit den relevanten Feldern
      user: {
        name: "",
        email: "",
        role: "",
        university: "",
        auto: "",
        musikauswahl: "",
      },
      // Validierungsregel für die E-Mail-Adresse
      emailRule: (email) => {
        // Regex für die Überprüfung der E-Mail-Adresse
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email) || "Bitte eine gültige Email-Adresse eingeben.";
      },
    };
  },
  
  methods: {
    // Methode zum Festlegen der CSS-Klasse für das Element
    universityClass(item) {
      return item == 'Bayreuth' ? 'bayreuth-green' : '';
    },
    // Methode zum Erstellen eines neuen Profils
    async createUser() {
      try {
        // Versuchen, das Benutzerprofil zu erstellen
        await axios.post("http://localhost:3000/users", this.user);

        // Erfolgsmeldung in der Snackbar anzeigen
        this.snackbar.message = "Profil erfolgreich erstellt!";
        this.snackbar.color ="success"; //Erfolgsmeldung, grün
        this.snackbar.visible = true;


        // Formular zurücksetzen
        this.user = {
          name: "",
          email: "",
          role: "",
          university: "",
          auto: "",
          musikauswahl: "",
        };
      } catch (error) {
        // Fehlerbehandlung bei fehlgeschlagenem Request
        this.snackbar.message ="Fehler beim Erstellen des Profils. Bitte versuche es erneut.";
        this.snackbar.color ="error"; //Fehlermeldung, rot
        this.snackbar.visible = true;
      }
    },
  },
};
</script>

<style scoped>
/* Hintergrundfarbe der gesamten Seite */
body {
  background-color: #f5f5f5;
}

/* Schriftart für die App */
.v-app {
  font-family: 'Roboto', sans-serif;
}

/* Definiert eine grüne Farbe für Bayreuth im Dropdown */
.bayreuth-green {
  color: green !important;
}

</style>
