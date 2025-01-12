<template>
  <v-app>
    <v-main>
      <!-- Hintergrundbild mit Overlay -->
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
        </header>
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 16px; z-index: 2;"
        >
          <div style="display: flex; align-items: center">
            <img
              src="https://www.instagram.com/pendlr_/p/DDUbZYaNFBc/"
              alt="Pendlr Logo"
              style="width: 50px; margin-right: 10px"
            />
            <h1 style="color: white; font-size: 2em; margin: 0">Pendlr</h1>
            <div
                    style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                  >
                    <v-btn icon style="background-color: transparent; color: white; text-transform: none; margin-left: 200px; height: 50px; font-size: 25px;">
                      <v-icon large>mdi-home</v-icon>
                    </v-btn>
                  </div>
                
                  <div
                    style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                  >
                  <v-btn
                   icon
                   @click="openCalendarPopup"
                   style="background-color: transparent; color: white; text-transform: none; font-size: 25px;"
          >
                   <v-icon large>mdi-calendar</v-icon>
                  </v-btn>
                  </div>

                  <div
                    style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                  >
                  <v-btn icon @click="toggleChatApp" style="background-color: transparent; color: white; text-transform: none; font-size: 25px;">
                  <v-icon large>mdi-chat</v-icon>
                  </v-btn>
                  </div>

                  <div
                  style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;">
                  <a href="https://www.vgn.de/verbindungen/" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; font-size: 25px;">
                   <v-icon large>mdi-train</v-icon>
                  </a>
                  </div>


                  <div
                    style="display: flex; align-items: center; flex-direction: column; margin-right: 150px; text-align: center;"
                  >
                    <v-btn icon style="background-color: transparent; color: white; text-transform: none; font-size: 25px;">
                      <v-icon large>mdi-account</v-icon>
                    </v-btn>
                  </div>

                  <div
                    style="display: flex; align-items: center; flex-direction: column; text-align: center;"
                  >
                    <v-btn 
                    icon @click="openSettingsPopup"
                     style="background-color: transparent; color: white; text-transform: none; font-size: 25px;">
                      <v-icon large>mdi-cog</v-icon>
                    </v-btn>        
                  </div>
          </div>
          <v-btn
  icon
  @click="toggleLanguagePopup"
  style="background-color: transparent; border-radius: 50%; padding: 5px"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
    alt="Deutsch"
    style="width: 30px; border-radius: 50%"
  />
</v-btn>

        </div>

        <!-- Hauptinhalt -->
        <div
          style="
            z-index: 2;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          "
        >
          <h2 style="font-size: 2.5em; color: white; margin-bottom: 20px">
            Was darf es heute sein?
          </h2>
          <div style="display: flex; justify-content: center; gap: 15px">
            <v-btn
            @click="openSuchePopup"
              style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
            >
              ICH SUCHE!
            </v-btn>
            <v-btn
            @click="openFahrePopup"
              style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
            >
              ICH FAHRE!
            </v-btn>

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
                <a href="#datenschutz" style="color: white; text-decoration: none;"
                  >Datenschutz</a
                >
              </p>
              <p>
                <a href="#agb"  style="color: white; text-decoration: none;">AGB</a>
              </p>
            </div>

            <!-- Social -->
            <div style="text-align: center;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Social</h2>
              <p><a href="https://www.instagram.com/pendlr_?igsh=ejU2cXlyc25zZWk4" style="color: white; text-decoration: none;">Instagram</a></p>
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

      <!-- Popups -->
      <div
        v-if="isAnyPopupOpen"
        @click="closeAllPopups"
        style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;"
      ></div>

       <!-- Chat Popup -->
      <ChatApp v-if="isChatAppOpen" @close="toggleChatApp"/>

      <!-- Suche Popup -->
      <div
      v-if="isSuchePopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closeSuchePopup" class="close-btn">✖</button>
          <h2>Einstellungen</h2>
        </div>
        <h1>App-Einstellungen</h1>

    <hr>

    <br>
    <div style="display: flex; justify-content: center; gap: 15px">
            <v-btn
              style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkgreen; width: 100%; display: flex; align-items: center;"
            >
              Meine Statistiken
            </v-btn>
      </div>

      <br>
    <div style="display: flex; justify-content: center; gap: 15px">
            <v-btn
              style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkred; width: 100%; display: flex; align-items: center;"
            >
              Abmelden
            </v-btn>
      </div>

    <br>
    <div style="display: flex; justify-content: center; gap: 15px">
            <v-btn
              style="font-size: 1.2em; height: 50px; background-color: darkgray; color: darkred; width: 100%; display: flex; align-items: center;"
            >
              Profil löschen
            </v-btn>
      </div>

      
    </div>

      <!-- Fahre Popup -->
     

      <!-- Suche&Fahre Popup -->
      

      <!-- Kalender-Popup -->
      <div v-if="isCalendarPopupOpen" class="calendar-popup">
          <div class="popup-header">
            <button @click="closeCalendarPopup" class="close-btn">✖</button>
            <h2 style="color: white;">Kalender</h2>
          </div>
          <!-- Vue Cal mit Events -->
          <vue-cal
            v-model="selectedDate"
            @date-selected="onDateSelected"
            :time-cell-interval="60"
            :events="events"
            time-range-start="06:00"
            time-range-end="18:00"
            style="height: calc(100% - 50px); color: white;"
          />
          
        </div>

      <!-- Settings Popup -->
      <div
      v-if="isSettingsPopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closeSettingsPopup" class="close-btn">✖</button>
          <h2>AGB</h2>
        </div>
        <h1>D</h1>

    </div>

      <!-- Sprachen Popup -->
      <div
        v-if="isLanguagePopupOpen"
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center;"
      >
        <div class="popup-header">
          <button @click="closeLanguagePopup" class="close-btn">✖</button>
          <h2>Sprache auswählen</h2>
        </div>
        <div class="language-options">
          <button @click="changeLanguage('de')">Deutsch</button>
          <button @click="changeLanguage('en')">English (US)</button>
          <button @click="changeLanguage('zh')">中文 (Chinese)</button>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css'; // Vergiss nicht, das CSS zu importieren
import ChatApp from './components/ChatApp.vue';

export default {
  name: 'App',
  components: {
    VueCal,
    ChatApp,
  },
  data() {
  return {
    isChatAppOpen: false, // Zustandsvariable für das Öffnen des Chat-Popups
    isLanguagePopupOpen: false,
    isSuchePopupOpen: false,
    isFahrePopupOpen: false,
    isSettingsPopupOpen: false,
    isCalendarPopupOpen: false, // Nur einmal hier definieren
    selectedDate: null, // Nur einmal hier definieren
    isAnyPopupOpen: false,
    events: [
      {
        start: new Date(new Date().setHours(17, 0, 0, 0)), // Heute um 17:00 Uhr
        end: new Date(new Date().setHours(18, 0, 0, 0)), // Bis 18:00 Uhr
        title: "Beispiel-Event", // Titel des Events
      },
    ],
  };
},
  computed: {
    
  },
  methods: {
    toggleChatApp() {
      this.isChatAppOpen = !this.isChatAppOpen; // Toggle die Anzeige des Chat-Popups
      this.isAnyPopupOpen = this.isChatAppOpen; // Setze isAnyPopupOpen auf true, wenn das Chat-Popup geöffnet ist
    },
    closeAllPopups() {
      this.isChatAppOpen = false;
      this.isAnyPopupOpen = false;
    },
    toggleLanguagePopup() {
      this.isLanguagePopupOpen = !this.isLanguagePopupOpen;
      this.isAnyPopupOpen = this.isLanguagePopupOpen;
    },
    closeLanguagePopup() {
      this.isLanguagePopupOpen = false;
      this.isAnyPopupOpen = false;
    },
   
    openSuchePopup() {
      this.isSuchePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeSuchePopup() {
      this.isSuchePopupOpen = false;
      this.isAnyPopupOpen = false;
    },

    openFahrePopup() {
      this.isSuchePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeFahrePopup() {
      this.isSuchePopupOpen = false;
      this.isAnyPopupOpen = false;
    },

    openSucheFahrePopup() {
      this.isSuchePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeSucheFahrePopup() {
      this.isSuchePopupOpen = false;
      this.isAnyPopupOpen = false;
    },

    openSettingsPopup() {
      this.isSuchePopupOpen = true;
      this.isAnyPopupOpen = true;
    },
    closeSettingsPopup() {
      this.isSuchePopupOpen = false;
      this.isAnyPopupOpen = false;
    },

    openCalendarPopup() {
      this.isCalendarPopupOpen = true;
    },
    closeCalendarPopup() {
      this.isCalendarPopupOpen = false;
    },
    onDateSelected(date) {
      this.selectedDate = date;
      console.log("Ausgewähltes Datum:", this.selectedDate);
      this.closeCalendarPopup();
    },
  },
    
     // Funktion zur Änderung der Sprache (hier simuliert)
     changeLanguage(language) {
      console.log("Sprache gewechselt zu:", language);
      // Hier kannst du die Logik zur tatsächlichen Sprachänderung hinzufügen
      this.closeLanguagePopup();
    },
     
    // Zerstöre den Kalender (falls das Popup geschlossen wird)
    destroyCalendar() {
      if (this.picker) {
        this.picker.destroy();
      }
    },
};
</script>

<style scoped>
/* Zusätzliche Styles für das Layout und Popup */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.calendar-popup {
  position: fixed;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #333; /* Hintergrundfarbe bleibt */
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 65%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.form-group {
  margin-bottom: 15px;
}
.form-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 1em;
}
.login-btn, .register-btn {
  width: 100%;
  padding: 10px;
  background-color: #008556;
  color: white;
  border: none;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}
.login-btn:hover, .register-btn:hover {
  background-color: #005c3c;
}
</style>
