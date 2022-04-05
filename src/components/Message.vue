<template>
    <div :class="msg.sender == state.watcher ? 'left' : 'right'">
        <p :class="msg.sender == state.watcher ? 'senders' : 'others'">{{ msg.txt }}</p>
        <button @click="like()">{{ heart }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { istate } from '../store';

const state = inject<istate>('state');
const liked = ref(false);
const heart = ref('🤍');

interface propss {
    msg: {
        id: number,
        txt: string,
        sender: string
    }
}
defineProps<propss>();

const like = () => {
    liked.value = !liked.value;
    heart.value = heart.value == '🤍' ? '❤️' : '🤍';
}
</script>

<style scoped>
div {
    display: flex;
    margin: 1rem;
    align-items: center;
}

p {
    font-size: 2em;
    padding: 0.1em 0.5em;
    margin-right: 1rem;
    border-radius: 1em;
    max-width: 10rem;
    overflow-wrap: break-word;
}
.left p {
    background-color: rgb(0, 102, 255);
    color: white;
}
.right {
    flex-direction: row-reverse;
    margin-left: 1rem;
}
.right p {
    background-color: rgb(255, 0, 0);
    text-align: center;
}

button {
    font-size: 1rem;
    border: 0;
    background-color: rgb(226, 224, 224);
    border-radius: 50%;
    padding: 0.5rem;
    height: fit-content;
    margin: 1rem;
}
button:hover {
    filter: brightness(90%);
}
</style>