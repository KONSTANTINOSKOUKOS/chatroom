<template>
    <div class="app">
        <Message v-for="msg in state.msgs" :msg="msg" id="msg.id" />
        <Form />
    </div>
</template>

<script setup>
import { inject } from 'vue'
import Message from './Message.vue'
import Form from './Form.vue'

const state = inject('state');
const db = inject('db');

</script>


<style scoped>
.app {
    min-height: 100vh;
}
</style>