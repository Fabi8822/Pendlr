<template>
  <v-app>
    <router-view></router-view> <!-- Hier wird der Inhalt der jeweiligen Route angezeigt -->
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
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 16px; z-index: 2;"
        >
          <div style="display: flex; align-items: center">
            <img
              src="pendlr.PNG"
              alt="Pendlr Logo"
              style="width: 50px; margin-right: 10px"
            />
            <h1 style="color: white; font-size: 2em; margin: 0">Pendlr</h1>
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
            Von 0 auf Fahrgemeinschaft in einem Klick!
          </h2>
          <div style="display: flex; justify-content: center; gap: 15px">
            <v-btn
              @click="openLoginPopup"
              style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
            >
              Login
            </v-btn>
            <v-btn
              @click="openRegisterPopup"
              style="font-size: 1.2em; height: 50px; background-color: #008556; color: white; width: 200px; display: flex; align-items: center;"
            >
              Registrieren
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
                <a href="#datenschutz" @click="openDatenschutzPopup" style="color: white; text-decoration: none;">Datenschutz</a>
              </p>
              <p>
                <a href="#agb" @click="openAGBPopup" style="color: white; text-decoration: none;">AGB</a>
              </p>
            </div>

            <!-- Social -->
            <div style="text-align: center;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Social</h2>
              <p><a href="https://www.instagram.com/pendlr_?igsh=ejU2cXlyc25zZWk4" target=_blank rel="noopener noreferrer" style="color: white; text-decoration: none;">Instagram</a></p>
              <p><a href="#youtube" style="color: white; text-decoration: none;">YouTube</a></p>
            </div>

            <!-- Weitere -->
            <div style="text-align: right;">
              <h2 style="margin-bottom: 10px; text-decoration: underline;">Weitere</h2>
              <p><a href="#faq" @click="openFAQPopup" style="color: white; text-decoration: none;">FAQ</a></p>
              <p><a href="#kontakt" @click="openKontaktPopup" style="color: white; text-decoration: none;">Kontakt</a></p>
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

      <!-- Language Popup -->
  <LanguagePopup 
    :isLanguagePopupOpen="isLanguagePopupOpen" 
    @close="closeLanguagePopup" 
    @language-changed="changeLanguage"
  />

      <!-- Login Popup -->
      <LoginPopup :isLoginPopupOpen="isLoginPopupOpen" @close-all-popups="closeAllPopups" />

      <!-- Register Popup -->
      <RegisterPopup
      :isRegisterPopupOpen="isRegisterPopupOpen" 
        @close="closeRegisterPopup"
        @open-Datenschutz-Popup="openDatenschutzPopup"
        @open-agb-popup="openAGBPopup"
      />

      <!-- Datenschutz Popup -->
      <DatenschutzPopup
        :isDatenschutzPopupOpen="isDatenschutzPopupOpen"
        @close="closeDatenschutzPopup" 
      />

      <!-- AGB Popup -->
      <AGBPopup :isAGBPopupOpen="isAGBPopupOpen" @close="closeAGBPopup" />

      <!-- Kontakt Popup -->
      <KontaktPopup :isKontaktPopupOpen="isKontaktPopupOpen" @close="closeKontaktPopup" />

      <!-- FAQ Popup -->
      <FAQPopup :isFAQPopupOpen="isFAQPopupOpen" @close="closeFAQPopup" />
    </v-main>
  </v-app>
</template>

<script>
import RegisterPopup from './components/RegisterPopup.vue';
import DatenschutzPopup from './components/DatenschutzPopup.vue';
import AGBPopup from './components/AGBPopup.vue';
import FAQPopup from './components/FAQPopup.vue';
import KontaktPopup from './components/KontaktPopup.vue';
import LoginPopup from './components/LoginPopup.vue';
import LanguagePopup from './components/LanguagePopup.vue';

export default {
  components: {
    RegisterPopup,
    DatenschutzPopup,
    AGBPopup,
    FAQPopup,
    KontaktPopup,
    LoginPopup,
    LanguagePopup,
  },
  data() {
    return {
      isLoginPopupOpen: false,
      isLanguagePopupOpen: false,
      isRegisterPopupOpen: false,
      isDatenschutzPopupOpen: false,
      isAGBPopupOpen: false,
      isKontaktPopupOpen: false,
      isFAQPopupOpen: false,
    };
  },
  computed: {
    isAnyPopupOpen() {
      return (
        this.isLoginPopupOpen ||
        this.isRegisterPopupOpen ||
        this.isDatenschutzPopupOpen ||
        this.isAGBPopupOpen ||
        this.isKontaktPopupOpen ||
        this.isFAQPopupOpen ||
        this.isLanguagePopupOpen
      );
    },
  },
  methods: {
    toggleLanguagePopup() {
      this.isLanguagePopupOpen = !this.isLanguagePopupOpen;
    },
    closeAllPopups() {
      this.isLoginPopupOpen = false;
      this.isRegisterPopupOpen = false;
      this.isDatenschutzPopupOpen = false;
      this.isAGBPopupOpen = false;
      this.isKontaktPopupOpen = false;
      this.isFAQPopupOpen = false;
      this.isLanguagePopupOpen = false;
    },
    openLoginPopup() {
      this.isLoginPopupOpen = true;
    },
    closeLoginPopup() {
      this.isLoginPopupOpen = false;
    },
    openRegisterPopup() {
      this.isRegisterPopupOpen = true;
    },
    closeRegisterPopup() {
      this.isRegisterPopupOpen = false;
    },
    openDatenschutzPopup() {
      this.isDatenschutzPopupOpen = true;
    },
    closeDatenschutzPopup() {
      this.isDatenschutzPopupOpen = false;
    },
    openAGBPopup() {
      this.isAGBPopupOpen = true;
    },
    closeAGBPopup() {
      this.isAGBPopupOpen = false;
    },
    openKontaktPopup() {
      this.isKontaktPopupOpen = true;
    },
    closeKontaktPopup() {
      this.isKontaktPopupOpen = false;
    },
    openFAQPopup() {
      this.isFAQPopupOpen = true;
    },
    closeFAQPopup() {
      this.isFAQPopupOpen = false;
    },
    changeLanguage(language) {
      console.log("Sprache gewechselt zu:", language);
      this.closeLanguagePopup();
    },
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
  z-index: 10;
}
.close-btn {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
