<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2" class="sidebar">
        <v-card class="pa-4" outlined>
          <v-avatar size="80" class="mb-2">
            <img :src="user.avatar" alt="Benutzer Avatar">
          </v-avatar>
          <v-subheader>{{ user.name }}</v-subheader>
          <v-divider></v-divider>
          <v-btn @click="toggleSettings">Einstellungen</v-btn>
          <v-btn @click="toggleGroupChat" class="mt-2">Gruppenchat</v-btn>
          <v-divider></v-divider>
          <v-select
            label="Status"
            v-model="user.status"
            :items="['Online', 'Abwesend', 'Nicht stören']"
            outlined
            dense
          ></v-select>
        </v-card>
      </v-col>

      <v-col cols="10">
        <v-card outlined class="chat-box">
          <v-card-title class="chat-header">
            <span>{{ currentChatTitle }}</span>
            <v-btn icon @click="scrollToBottom">
              <v-icon>mdi-arrow-down-circle</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="chat-messages">
            <!-- Hier verwenden wir messages direkt, nicht filteredMessages -->
            <v-row v-for="(message, index) in messages" :key="index">
              <v-col cols="12">
                <v-card class="mb-2" outlined :class="{'new-message': message.isNew}">
                  <v-card-title>
                    <v-avatar size="40" class="mr-2">
                      <img :src="message.senderAvatar" alt="Sender Avatar">
                    </v-avatar>
                    <strong>{{ message.sender }}</strong>
                    <span class="ml-auto" style="font-size: 0.75rem; color: gray;">
                      {{ message.timestamp }}
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <div v-if="message.type === 'text'">{{ message.content }}</div>
                    <div v-if="message.type === 'image'">
                      <v-img :src="message.content" max-width="200px" />
                    </div>
                    <div v-if="message.type === 'emoji'">
                      <v-icon>{{ message.content }}</v-icon>
                    </div>
                    <div v-if="message.type === 'video'">
                      <video :src="message.content" controls class="video-message"></video>
                    </div>
                    <div v-if="message.type === 'audio'">
                      <audio :src="message.content" controls class="audio-message"></audio>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn icon @click="reactToMessage(index, '👍')">
                      <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                    <v-btn icon @click="reactToMessage(index, '❤️')">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="isTyping">
              <v-col cols="12">
                <v-card class="mb-2" outlined>
                  <v-card-text class="typing-indicator">
                    <v-icon>mdi-account-tie</v-icon>
                    <span>{{ user.name }} ist am Tippen...</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="message-input">
            <v-textarea
              v-model="newMessage"
              label="Schreibe eine Nachricht"
              outlined
              rows="3"
              :error-messages="errorMessage ? [errorMessage] : []"
              placeholder="Gib hier deine Nachricht ein..."
              @input="onTyping"
              :disabled="isSending"
            ></v-textarea>
            <v-btn @click="attachFile" icon>
              <v-icon>mdi-paperclip</v-icon>
            </v-btn>
            <v-btn @click="sendMessage" color="primary" :loading="isSending" :disabled="!newMessage.trim() || isSending">
              Senden
            </v-btn>
            <v-btn @click="sendEmoji('😀')" icon>
              <v-icon>mdi-emoticon</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Pendlr Serviceteam",
        avatar: "https://randomuser.me/api/portraits/men/81.jpg",
        status: "Online", // Neuer Status
      },
      newMessage: "",
      messages: [], // Nachrichten werden hier gespeichert
      isSending: false,
      errorMessage: "",
      isTyping: false,
      snackbar: {
        show: false,
      },
      settingsDialog: false,
      searchDialog: false,
      searchQuery: "",
      darkMode: false,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") {
        this.errorMessage = "Die Nachricht darf nicht leer sein.";
        return;
      }

      this.isSending = true;

      const messageType = this.getMessageType(this.newMessage);
      const message = {
        content: this.newMessage,
        timestamp: new Date().toLocaleTimeString(),
        sender: this.user.name,
        senderAvatar: this.user.avatar,
        type: messageType,
        isNew: true,
      };

      setTimeout(() => {
        this.messages.push(message); // Nachrichten in den Array schieben
        this.newMessage = "";
        this.errorMessage = "";
        this.isSending = false;
        this.snackbar.show = true;
        setTimeout(() => {
          this.messages[this.messages.length - 1].isNew = false;
        }, 1000);
      }, 1500);
    },

    getMessageType(message) {
      if (message.startsWith("http")) {
        if (message.match(/\.(jpeg|jpg|gif|png)$/)) {
          return "image";
        }
        if (message.match(/\.(mp4|avi)$/)) {
          return "video";
        }
      }
      if (message.startsWith(":") && message.endsWith(":")) {
        return "emoji";
      }
      return "text";
    },

    sendEmoji(emoji) {
      this.newMessage = emoji;
      this.sendMessage();
    },

    reactToMessage(index, reaction) {
      const message = this.messages[index];
      if (!message.reactions) {
        message.reactions = [];
      }
      message.reactions.push(reaction);
    },

    onTyping() {
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
      }, 1500);
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$el.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },

    attachFile() {
      alert("Datei auswählen...");
    },
  },
};
</script>

<style scoped>
.chat-box {
  padding: 20px;
}

.chat-header {
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.chat-messages {
  height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

.message-input {
  display: flex;
  align-items: center;
}

.v-textarea {
  flex: 1;
  margin-right: 10px;
}

.v-btn:disabled {
  background-color: #dcdcdc;
}

.v-card:hover {
  transform: scale(1.02);
}

.typing-indicator {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: gray;
}

.chat-light {
  background-color: #fff;
  color: black;
}

.chat-dark {
  background-color: #333;
  color: white;
}

.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.new-message {
  background-color: #f0f8ff;
}
</style>
