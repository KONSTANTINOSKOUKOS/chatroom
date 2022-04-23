<template>
  <h1>Log in to send messages</h1>
  <button @click="loginwgoogle" style="margin: 1rem auto;"> Log In With Google</button>
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

<style scoped>
button {
  border: 0;
  background-color: cyan;
  border-radius: 1rem;
  font-size: 2rem;
  display: flex;
  justify-items: center;
}

h1 {
  text-align: center;
  text-decoration: underline;
}
</style>
