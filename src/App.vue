<template>
  <Auth v-if="!state.user" />

  <Chat v-else/>
    
</template>
<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import state from './store';
import { provide } from "vue";

import Chat from "./components/Chat.vue";
import Auth from './components/Auth.vue';

const firebaseConfig = {
  apiKey: "AIzaSyBQIzMt7WX15ElNiUUXDKjSAmM5g-qQl-k",
  authDomain: "chat-c41f5.firebaseapp.com",
  projectId: "chat-c41f5",
  storageBucket: "chat-c41f5.appspot.com",
  messagingSenderId: "503653424889",
  appId: "1:503653424889:web:6a828486b7b59b2754cc28",
  measurementId: "G-PESXKQ3L3X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

provide('db', db);
provide('state', state);
provide('auth', auth);
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
