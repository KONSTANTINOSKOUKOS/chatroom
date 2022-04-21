<template>
  <div class="app">
    <nav>
      <button @click="logout()">Log out</button>
      <img :src="state.user.photoURL" alt="">
    </nav>
    <Message v-for="msg in state.msgs" :msg="msg" id="msg.id" />
    <div style="margin-top: 2rem;"></div>
    <Form />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import Message from "./Message.vue";
import Form from "./Form.vue";
import { signOut } from "firebase/auth";

const state = inject("state");
const auth = inject("auth");

const logout = () => {
  signOut(auth).then(() => {
    state.user = null;
  });
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  scroll-behavior: smooth;
  margin-top: 3rem;
}
nav{
  display: flex;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  min-height: 10%;
  top: 0;
  z-index: 999;
  background-color: blanchedalmond;
}
nav img{
  width: 2.5rem;
  margin: 1rem;
  border-radius: 50%;
}
nav button{
  margin: auto 0;
  font-size: 1.1em;
  background-color: aqua;
  border: 0;
  padding: .3rem;
  border-radius: 10rem;
}
</style>
