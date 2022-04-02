<template>
    <form @submit.prevent="send">
        <input type="text" v-model="msg" placeholder="send something" />
        <button type="submit">Send</button>
    </form>

    <input type="radio" value="george" v-model="state.watcher" />
    <label>George</label>

    <input type="radio" value="john" v-model="state.watcher" />
    <label>John</label>

</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const state = inject('state');
const msg = ref('');

const send = () => {
    if (msg.value != '') {
        state.msgs.push({
            id: Math.random(), txt: msg.value, sender: state.watcher
        });
        msg.value = ''
    }
}
</script>

<style scoped>

</style>