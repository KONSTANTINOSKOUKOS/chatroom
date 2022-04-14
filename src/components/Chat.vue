<template>
    <div class="app">
        <button @click="logout()">Log out</button>
        <Message v-for="msg in state.msgs" :msg="msg" id="msg.id" />
        <div @dum-ev="scroll()" id="dum"></div>
        <Form />
    </div>
</template>

<script lang="ts" setup>
import { ref, inject, watch } from 'vue'
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
const scroll = () => {
    console.log(dum.value);
    window.scrollTo({
        top: 0, behavior: 'smooth'
    })
}

const dum = ref(null);
watch(state.scroll, () => {
    if (state.scroll) {
        scroll();
    }
})

</script>

<style scoped>
.app {
    min-height: 100vh;
    scroll-behavior: smooth;
}
</style>