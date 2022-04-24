<template>
  <nav>
    <h1>CHATROOM</h1>
    <h2>Log in to send messages</h2>
  </nav>
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
nav{
  width: 100vw;
  /* min-height: 10vh; */
  background-color: rgb(130, 143, 152);
}
button {
  border: 0;
  background-color: rgb(184, 184, 184);
  border-radius: 1rem;
  font-size: 2rem;
  padding: .2rem .5rem;
  display: flex;
  justify-items: center;
}

button:hover {
  background-color: #7b83dc;
  /* color: #fff; */
}

h1 {
  font-size: 3em;
  text-align: center;
  padding-bottom: .1rem;
  color:black;
}
h2{
  font-size: 2em;
  text-align: center;
  color: black;
}
</style>
