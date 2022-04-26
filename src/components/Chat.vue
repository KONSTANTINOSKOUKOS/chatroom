<template>
  <div class="superchat">
    <Nav/>
    <Message v-for="msg in state.msgs" :msg="msg" :key="msg.id" />
    <div style="margin-top: 2rem;"></div>
    <Form />
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { istate } from "../store";
import Nav from "./Nav.vue";
import Message from "./Message.vue";
import Form from "./Form.vue";

const state: istate = inject("state");

</script>

<style scoped>
.superchat {
  min-height: 100vh;
  scroll-behavior: smooth;
  margin: 10vh 0;
}
</style>
