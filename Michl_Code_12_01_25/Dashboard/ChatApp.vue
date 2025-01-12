<template>
    <div class="chat-app">
      <!-- Chatübersicht (Popup) -->
      <div class="chat-popup">
        <div class="chat-header">
          <button @click="closeChatApp">✖</button> <!-- Schließ-Button "×" -->
          <div class="chat-title">Deine Chats</div> <!-- Titel auf der rechten Seite -->
        </div>
  
        <div class="chat-list">
          <div 
            v-for="(chat, index) in chats" 
            :key="index" 
            class="chat-item" 
            @click="openChatWindow(chat)">
            
            <img :src="chat.profilePic" alt="Profile" class="chat-avatar" />
            <div class="chat-info">
              <div class="chat-name">{{ chat.name }}</div>
              <div class="chat-last-message">{{ chat.lastMessage }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Chat-Fenster -->
      <div v-if="selectedChat" class="chat-window">
        <div class="chat-header">
          <button @click="closeChatWindow">←</button> <!-- Schließ-Button "←" -->
          <div class="chat-title">{{ selectedChat.name }}</div> <!-- Titel auf der rechten Seite -->
        </div>
  
        <div class="chat-messages">
          <div v-for="(message, index) in selectedChat.messages" :key="index" class="message">
            <strong>{{ message.sender }}:</strong> {{ message.text }}
          </div>
        </div>
  
        <div class="chat-input">
          <input v-model="newMessage" placeholder="Nachricht schreiben..." @keyup.enter="sendMessage" />
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        selectedChat: null,
        newMessage: '',
        chats: [
          {
            name: "Max Mustermann",
            profilePic: "https://www.w3schools.com/w3images/avatar2.png",
            lastMessage: "Wann treffen wir uns?",
            messages: [
              { sender: "Max", text: "Hey, wie geht's?" },
              { sender: "Du", text: "Alles gut, dir?" }
            ]
          },
          {
            name: "Anna Schmidt",
            profilePic: "https://www.w3schools.com/w3images/avatar1.png",
            lastMessage: "Ich bin noch nicht sicher.",
            messages: [
              { sender: "Anna", text: "Hi, hast du heute Zeit?" },
              { sender: "Du", text: "Ja, wie sieht's bei dir aus?" }
            ]
          }
        ],
        loading: false
      };
    },
    methods: {
      closeChatApp() {
        this.$emit('close');
      },
      openChatWindow(chat) {
        this.selectedChat = chat;
      },
      closeChatWindow() {
        this.selectedChat = null;
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const chatMessages = this.$el.querySelector('.chat-messages');
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      },
      async sendMessage() {
        if (this.newMessage.trim()) {
          this.loading = true;
          this.selectedChat.messages.push({
            sender: "Du",
            text: this.newMessage
          });
          this.newMessage = '';
          
          // Simuliere eine API-Anfrage
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          this.selectedChat.lastMessage = this.selectedChat.messages[this.selectedChat.messages.length - 1].text;
          this.loading = false;
  
          this.scrollToBottom();
        }
      }
    }
  };
  </script>
  
  <style scoped>
.chat-app {
  position: fixed;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 70%;
  background-color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  border-radius: 15px;
  color: #fff; /* Alle Texte im Chat werden weiß */
}

.chat-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  overflow-y: auto;
  border-radius: 15px;
  color: #fff; /* Alle Texte im Popup werden weiß */
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-top: 20px; /* Mehr Abstand vom oberen Rand */
  padding-bottom: 10px; /* Optional, für etwas weniger Abstand unten */
}

.chat-header button {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #fff;
  cursor: pointer;
  padding: 0;
  margin-left: 10px; /* Etwas Abstand vom Rand */
}

.chat-header .chat-title {
  font-size: 1.2em;
  margin-right: 10px;
}

.chat-list {
  margin-top: 20px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  color: #fff; /* Text der Chat-Items wird weiß */
}

.chat-item:hover {
  background-color: lightgray;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-info {
  display: flex;
  flex-direction: column;
}

.chat-name {
  font-weight: bold;
  color: #fff; /* Name wird weiß */
}

.chat-last-message {
  color: #fff; /* Letzte Nachricht wird weiß */
  font-size: 0.9em;
}

.chat-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  color: #fff; /* Alle Texte im Chat-Fenster werden weiß */
}

.chat-messages {
  flex-grow: 1;
  margin-bottom: 20px;
  overflow-y: auto;
}

.chat-input {
  display: flex;
  padding-top: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #444; /* Dunkler Hintergrund für das Eingabefeld */
  color: #fff; /* Text im Eingabefeld wird weiß */
}

.loading-indicator {
  font-size: 1.2em;
  color: #fff; /* Ladeindikator wird weiß */
}
</style>


  
