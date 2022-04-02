<template>
  <div class="app">
    <Message v-for="msg in state.msgs" :msg="msg" id="msg.id" />
    <Form />
  </div>
</template>
<script setup lang="ts">
import state from './store/store'
import { provide } from "vue";

import Message from './components/Message.vue'
import Form from './components/Form.vue'

provide('state', state);

</script>


<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  min-height: 100vh;
}
</style>
