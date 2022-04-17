<template>
  <h1>Log in to send messages</h1>
  <button @click="loginwgoogle">Log In With Goggle</button>
  <h2>Or use as a guest</h2>
</template>

<script setup>
import { inject } from "vue";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import state from "../store";

const auth = inject("auth");

const loginwgoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then((res) => {
    state.user = res.user;
    console.log(state.user);
  });
};

const useasguest = async () => {
  await signInAnonymously(auth).then(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        state.user = user;
      }
    });
  });
};
</script>

<style scoped></style>
