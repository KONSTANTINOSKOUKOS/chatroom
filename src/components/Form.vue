<template>
    <div ref="dum"></div>
    <form @submit.prevent="send(); $emit('dum-ev');">
        <input type="text" v-model="msg" placeholder="send something " />
        <button type="submit">Send</button>
    </form>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { istate } from '../store';
import { addDoc, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

const state = inject<istate>('state');
const db = inject('db');
const msg = ref('');
const dum = ref<null | HTMLDivElement>(null);

const coll = collection(db, 'messages');

onMounted(async () => {
    state.msgs = [];
    const q = query(coll, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (docs) => {
        state.msgs = [];
        docs.forEach(doc => {
            state.msgs.push(doc.data());
        });
    });
});

const send = () => {
    
    if (msg.value != '') {
        const message: istate['msgtype'] = {
            id: Math.random(),
            liked: false,
            sender: state.user.uid,
            txt: msg.value,
            date: Date.now(),
            img: state.user.photoURL
        };
        addDoc(coll, message);
        msg.value = '';
        dum.value.scrollIntoView({ behavior: 'smooth' });
        console.log(state.msgs);
    }
}
</script>

<style scoped>
form {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    min-width: 100vw;
    bottom: 0;
    position: fixed;
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
    margin: .2rem 1em;
    border: 0;
    padding: 0.2rem 0.3rem;
    border-radius: 2rem;
    background-color: rgb(226, 224, 224);
    color: cornflowerblue;
}
</style>