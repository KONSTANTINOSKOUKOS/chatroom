<template>
    <div class="app">
        <button @click="logout()">Log out</button>
        <Message v-for="msg in state.msgs" :msg="msg" id="msg.id" />
        <Form />
    </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import Message from './Message.vue'
import Form from './Form.vue'
import { signOut } from "firebase/auth";

const state = inject('state');
const auth = inject('auth');

const logout = () => {
    signOut(auth).then(() => {
        state.user = null;
    });
}

</script>

<style scoped>
.app {
    min-height: 100vh;
    scroll-behavior: smooth;
}
</style>