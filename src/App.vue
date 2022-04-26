<template>
  <Auth v-if="!state.user" />

  <!-- <Chat v-else /> -->
  <Home v-else />
</template>
<script setup lang="ts">
import state from "./store";
import { provide } from "vue";
import { db, auth } from "./firebase";

import Chat from "./components/Chat.vue";
import Auth from "./components/Auth.vue";
import Home from './components/Home.vue';

provide("db", db);
provide("state", state);
provide("auth", auth);
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
