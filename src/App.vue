<template>
  <Auth v-if="!state.user" />

  <div v-else>
    <Nav/>
    <router-view></router-view>
    <PagesNav />
  </div>
  <!-- <Home /> -->
</template>
<script setup lang="ts">
import state from "./store";
import { provide } from "vue";
import { db, auth } from "./firebase";

import Auth from "./components/Auth.vue";

import PagesNav from "./components/PagesNav.vue";
import Nav from "./components/Nav.vue";

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
  