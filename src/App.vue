<template>
  <Message v-for="msg in state.msgs" :msg="msg" id="msg.id"/>
  <Form/>
</template>
<script setup lang="ts">
import state from './store/store'
import { provide } from "vue";

import Message from './components/Message.vue'
import Form from './components/Form.vue'

provide('state', state);

</script>


<style>
*,*::before,*::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
