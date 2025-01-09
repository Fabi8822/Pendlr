<template>
    <v-container>
      <!-- Titel der Seite -->
      <h1 class="text-center">Pendlr Kilometerstand Tracker</h1>
  
      <!-- Abschnitt: Kilometerstand -->
      <v-card outlined class="pa-4 my-4">
        <h2>Aktueller Kilometerstand</h2>
        <p>
          Dein aktueller Kilometerstand beträgt: 
          <strong>{{ kilometers }} km</strong>
        </p>
  
        <!-- Button zum Hinzufügen von Kilometern -->
        <v-btn color="primary" @click="addKilometers">Kilometer hinzufügen</v-btn>
      </v-card>
  
      <!-- Abschnitt: Belohnungen -->
      <v-divider class="my-4"></v-divider>
      <h2 class="text-center">Deine Belohnungen</h2>
  
      <!-- Liste der Belohnungen -->
      <v-list>
        <v-list-item
          v-for="reward in rewards"
          :key="reward.km"
          :class="{'claimed-reward': reward.claimed}"
        >
          <v-list-item-content>
            <!-- Beschreibung der Belohnung -->
            <v-list-item-title>
              {{ reward.description }} (ab {{ reward.km }} km)
            </v-list-item-title>
          </v-list-item-content>
  
          <!-- Symbol, wenn Belohnung erhalten wurde -->
          <v-list-item-icon v-if="reward.claimed">
            <v-icon color="green">mdi-check-circle</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
  
      <!-- Info: Belohnung noch nicht erreicht -->
      <p v-if="!anyRewardClaimed" class="text-center">
        Du hast noch keine Belohnungen erhalten. Fahre weiter, um Meilensteine zu erreichen!
      </p>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Aktueller Kilometerstand des Nutzers
        kilometers: 0,
  
        // Belohnungen basierend auf Meilensteinen
        rewards: [
          { km: 1000, description: "5€ Mensa-Gutschein", claimed: false },
          { km: 5000, description: "10€ Mensa-Gutschein", claimed: false },
          { km: 10000, description: "50€ Mensa-Gutschein", claimed: false },
        ],
      };
    },
    computed: {
      /**
       * Überprüft, ob mindestens eine Belohnung bereits erhalten wurde.
       */
      anyRewardClaimed() {
        return this.rewards.some((reward) => reward.claimed);
      },
    },
    methods: {
      /**
       * Methode zum Hinzufügen von Kilometern.
       * Diese Funktion simuliert das Fahren und fügt Kilometer hinzu.
       */
      addKilometers() {
        const additionalKm = 50; // Beispiel: Erhöht die Kilometer um 50
        this.kilometers += additionalKm;
        this.checkRewards(); // Überprüft, ob neue Belohnungen freigeschaltet wurden
      },
  
      /**
       * Überprüft alle Belohnungen und markiert diese als "erhalten",
       * falls die Kilometeranzahl erreicht oder überschritten wurde.
       */
      checkRewards() {
        this.rewards.forEach((reward) => {
          if (!reward.claimed && this.kilometers >= reward.km) {
            reward.claimed = true; // Belohnung als erhalten markieren
            alert(
              `Glückwunsch! Du hast ${reward.description} für das Erreichen von ${reward.km} km erhalten!`
            );
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Zentrierte Überschrift */
  .text-center {
    text-align: center;
  }
  
  /* Hervorhebung für erhaltene Belohnungen */
  .claimed-reward {
    background-color: #e0f7fa; /* Hellblauer Hintergrund */
  }
  </style>
  