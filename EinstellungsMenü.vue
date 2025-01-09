<template>
    <v-app :dark="isDark">
      <!-- Dialog für die Einstellungen -->
      <v-dialog v-model="settingsDialog" persistent max-width="800px">
        <v-card class="unibayreuth-card">
          <v-card-title class="headline justify-center">Einstellungen</v-card-title>
          <v-card-text>
            <!-- Navigation innerhalb des Menüs -->
            <v-tabs v-model="currentTab" fixed-tabs background-color="green" dark aria-label="Einstellungen Kategorien">
              <v-tab class="unibayreuth-tab" aria-label="Allgemeine Einstellungen">Allgemein</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Benachrichtigungen">Benachrichtigungen</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Datenschutz">Datenschutz</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Profil">Profil</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Sicherheit">Sicherheit</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Hilfe">Hilfe</v-tab>
              <v-tab class="unibayreuth-tab" aria-label="Feedback">Feedback</v-tab>
            </v-tabs>
  
            <!-- Inhalte für jede Kategorie -->
            <v-tabs-items v-model="currentTab">
              <!-- Allgemein -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Allgemeine Einstellungen</h3>
                <v-select
                  v-model="selectedLanguage"
                  :items="languages"
                  item-text="label"
                  item-value="code"
                  label="Sprache wählen"
                  dense
                  outlined
                  class="unibayreuth-input mt-3"
                  @change="handleLanguageChange"
                  aria-label="Sprache wählen"
                ></v-select>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-switch
                      v-model="isDark"
                      label="Dunkles Thema aktivieren"
                      dense
                      class="unibayreuth-switch mt-3"
                      v-bind="attrs"
                      v-on="on"
                      aria-label="Dunkles Thema aktivieren"
                    ></v-switch>
                  </template>
                  <span>Wechseln Sie zwischen einem dunklen und einem hellen Thema.</span>
                </v-tooltip>
  
                <v-divider class="mt-4" />
                <v-btn @click="openThemeSettings" color="green" class="unibayreuth-btn">Themen anpassen</v-btn>
              </v-tab-item>
  
              <!-- Benachrichtigungen -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Benachrichtigungseinstellungen</h3>
                <v-checkbox
                  v-model="notifications"
                  label="Benachrichtigungen aktivieren"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-checkbox
                  v-model="emailNotifications"
                  :disabled="!notifications"
                  label="E-Mail-Benachrichtigungen"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-checkbox
                  v-model="pushNotifications"
                  :disabled="!notifications"
                  label="Push-Benachrichtigungen"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-checkbox
                  v-model="smsNotifications"
                  :disabled="!notifications"
                  label="SMS-Benachrichtigungen"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="info" v-bind="attrs" v-on="on" @click="openNotificationHelp" class="unibayreuth-btn">
                      Benachrichtigungshilfe
                    </v-btn>
                  </template>
                  <span>Erfahren Sie, wie Sie Benachrichtigungen anpassen können.</span>
                </v-tooltip>
              </v-tab-item>
  
              <!-- Datenschutz -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Datenschutzeinstellungen</h3>
                <v-checkbox
                  v-model="dataSharing"
                  label="Teilen anonymisierter Daten zur Verbesserung der App"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-checkbox
                  v-model="adsPersonalization"
                  label="Personalisierte Werbung aktivieren"
                  class="unibayreuth-checkbox"
                ></v-checkbox>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text color="green" class="mt-3" v-bind="attrs" v-on="on" @click="showPrivacyPolicy">
                      Datenschutzrichtlinie anzeigen
                    </v-btn>
                  </template>
                  <span>Erfahren Sie mehr darüber, wie Ihre Daten verwendet werden.</span>
                </v-tooltip>
              </v-tab-item>
  
              <!-- Profil -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Profilmanagement</h3>
                <v-text-field
                  v-model="profile.name"
                  label="Name"
                  outlined
                  dense
                  class="unibayreuth-input"
                  :rules="[nameRule]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="profile.email"
                  label="E-Mail-Adresse"
                  outlined
                  dense
                  class="unibayreuth-input"
                  :rules="[emailRule]"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="profile.picture"
                  label="Profilbild hochladen"
                  accept="image/*"
                  dense
                  outlined
                  class="unibayreuth-input"
                ></v-file-input>
                <v-btn color="green" class="unibayreuth-btn mt-3" @click="saveProfile" :disabled="!profile.name || !profile.email">
                  Profil speichern
                </v-btn>
              </v-tab-item>
  
              <!-- Sicherheit -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Sicherheit</h3>
                <v-text-field
                  v-model="newPassword"
                  label="Neues Passwort"
                  type="password"
                  outlined
                  dense
                  :rules="[passwordRule]"
                  class="unibayreuth-input"
                ></v-text-field>
                <v-btn color="green" block class="my-3 unibayreuth-btn" @click="confirmPasswordChange">
                  Passwort ändern
                </v-btn>
  
                <v-divider />
                <v-select
                  v-model="securityQuestion"
                  :items="securityQuestions"
                  label="Sicherheitsfrage wählen"
                  outlined
                  dense
                  class="unibayreuth-input"
                ></v-select>
                <v-text-field
                  v-model="securityAnswer"
                  label="Antwort auf Sicherheitsfrage"
                  outlined
                  dense
                  :rules="[securityAnswerRule]"
                  class="unibayreuth-input"
                ></v-text-field>
                <v-btn color="green" class="mt-3 unibayreuth-btn" @click="saveSecuritySettings">Sicherheitseinstellungen speichern</v-btn>
              </v-tab-item>
  
              <!-- Hilfe -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Hilfe</h3>
                <p>Hier finden Sie nützliche Informationen zur Nutzung der Einstellungen.</p>
                <v-btn color="info" @click="openHelpSection" class="unibayreuth-btn">Mehr erfahren</v-btn>
              </v-tab-item>
  
              <!-- Feedback -->
              <v-tab-item>
                <h3 class="unibayreuth-heading">Feedback</h3>
                <v-textarea
                  v-model="userFeedback"
                  label="Geben Sie uns Ihr Feedback"
                  outlined
                  dense
                  rows="4"
                  class="unibayreuth-input"
                ></v-textarea>
                <v-btn color="success" @click="submitFeedback" class="mt-3 unibayreuth-btn">Feedback senden</v-btn>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
  
          <!-- Aktionen -->
          <v-card-actions>
            <v-btn text @click="cancelSettings" class="unibayreuth-btn">Abbrechen</v-btn>
            <v-btn color="green" @click="saveSettings" :loading="isSaving" class="unibayreuth-btn">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Hauptinhalt mit Button, um Einstellungen zu öffnen -->
      <v-container>
        <v-btn @click="settingsDialog = true" color="green" class="unibayreuth-btn">Einstellungen öffnen</v-btn>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: "EinstellungenMenü",
    data() {
      return {
        settingsDialog: false,
        currentTab: 0,
        languages: [
          { label: "Deutsch", code: "de" },
          { label: "Englisch", code: "en" },
          { label: "Mandarin", code: "zh" },
        ],
        selectedLanguage: "de",
        isDark: false,
        dataSharing: false,
        adsPersonalization: false,
        notifications: true,
        emailNotifications: false,
        pushNotifications: false,
        smsNotifications: false,
        profile: { name: "", email: "", picture: null },
        newPassword: "",
        securityQuestion: "",
        securityAnswer: "",
        isSaving: false,
        userFeedback: "",
        // Validierungsregeln
        nameRule: [(v) => !!v || "Name ist erforderlich"],
        emailRule: [(v) => /.+@.+/.test(v) || "Gültige E-Mail erforderlich"],
        passwordRule: [(v) => v.length >= 6 || "Passwort muss mindestens 6 Zeichen lang sein"],
        securityAnswerRule: [(v) => !!v || "Antwort ist erforderlich"],
        securityQuestions: [
          "Was ist der Name deines ersten Haustiers?",
          "Was ist der Name deiner Mutter?",
          "Was war dein erster Job?",
        ],
      };
    },
    methods: {
      saveSettings() {
        this.isSaving = true;
        setTimeout(() => {
          this.isSaving = false;
          this.settingsDialog = false;
        }, 2000); // Simulation der Speicherzeit
      },
      cancelSettings() {
        this.settingsDialog = false;
      },
      saveProfile() {
        console.log("Profil gespeichert", this.profile);
      },
      handleLanguageChange() {
        console.log("Sprache geändert zu:", this.selectedLanguage);
      },
      openThemeSettings() {
        console.log("Theme-Einstellungen geöffnet");
      },
      openNotificationHelp() {
        console.log("Hilfe zu Benachrichtigungen geöffnet");
      },
      showPrivacyPolicy() {
        console.log("Datenschutzrichtlinie anzeigen");
      },
      confirmPasswordChange() {
        console.log("Passwort wurde geändert");
      },
      saveSecuritySettings() {
        console.log("Sicherheitseinstellungen gespeichert");
      },
      openHelpSection() {
        console.log("Hilfe-Section geöffnet");
      },
      submitFeedback() {
        console.log("Feedback gesendet:", this.userFeedback);
      },
    },
  };
  </script>
  
  <style scoped>
  .unibayreuth-card {
    background-color: #e5f1e5; /* Sanftes Grünton der Universität Bayreuth */
  }
  
  .unibayreuth-btn {
    background-color: #007a3d; /* Grüner Button für die Universität Bayreuth */
    color: white;
  }
  
  .unibayreuth-tab {
    color: #007a3d; /* Grün für Tab-Elemente */
  }
  
  .unibayreuth-heading {
    color: #007a3d; /* Grüner Text für die Überschrift */
  }
  
  .unibayreuth-input {
    background-color: #f1f8f1; /* Hellgrüner Hintergrund für Eingabefelder */
  }
  
  .unibayreuth-switch {
    color: #007a3d; /* Grüner Switch */
  }
  
  .unibayreuth-checkbox {
    color: #007a3d; /* Grüner Checkbox */
  }
  </style>
  