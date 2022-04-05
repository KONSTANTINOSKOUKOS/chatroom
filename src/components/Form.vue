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
import { istate } from '../store';
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

const state = inject<istate>('state');
const db = inject('db');
const msg = ref('');

const send = () => {
    if (msg.value != '') {
        const message = {
            id: Math.random(),
            txt: msg.value,
            sender: state.watcher,
            liked: false
        };
        const coll =collection(db, 'messages'); 
        addDoc(coll, message);
        //state.msgs.push(message);// USE GET DATA 
        msg.value = '';
        const messages = getDoc(doc(db,'messages'));
        console.log(messages);
    }
}
</script>

<style scoped>
form {
    display: flex;
    align-items: center;
    justify-content: center;
}
form input {
    width: 50rem;
    height: 1.7rem;
    border-radius: 13px;
    background-color: rgb(226, 224, 224);
    border: 0;
    text-indent: 10px;
}
button {
    font-size: 1.4rem;
    margin-left: 1em;
    border: 0;
    padding: 0.4rem;
    border-radius: 1rem;
    background-color: rgb(226, 224, 224);
    color: cornflowerblue;
}
</style>