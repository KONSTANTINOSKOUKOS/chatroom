<template>
    <div class="cont">
        <button class="noti" @click="handlenotif" >&#8964;</button>
        <form @submit.prevent="send();">
            <input type="text" v-model="msg" placeholder="Πείτε κάτι" />
            <button class="submit" type="submit">Send</button>
        </form>
    </div>
    <div ref="dum"></div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { istate } from '../store';
import { doc, setDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Auth } from "firebase/auth";

const state = inject<istate>('state');
const db = inject('db');
const auth = inject<Auth>('auth');
const msg = ref('');
const dum = ref<null | HTMLDivElement>(null);

const coll = collection(db, 'messages');

const notif = ref(true);

const handlenotif = () => {
    notif.value = false;
    dum.value.scrollIntoView({ behavior: 'smooth' });
}

onMounted(async () => {
    state.msgs = [];
    const q = query(coll, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (docs) => {
        state.msgs = [];
        docs.forEach(doc => {
            state.msgs.push(doc.data());
        });
        console.log(state.msgs[state.msgs.length].sender);

        if (state.msgs[state.msgs.length - 1].sender != auth.currentUser.uid
            && isInViewport(dum.value.getBoundingClientRect())) {
            notif.value = true;
        }
    });
});

const send = async () => {

    if (msg.value != '') {
        const date = Date.now();
        const message: istate['msgtype'] = {
            id: Math.random(),
            liked: false,
            sender: state.user.uid,
            txt: msg.value,
            date: date,
            img: state.user.photoURL
        };
        await setDoc(doc(db, 'messages', date.toString()), message);
        msg.value = '';
        dum.value.scrollIntoView({ behavior: 'smooth' });
    }
}

const isInViewport = (element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
</script>

<style scoped>
.cont {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* height: 4vh; */
    display: flex;
    margin-bottom: 1vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.noti {
    font-size: 3rem;
    border: 0;
    padding: .1rem;
    background-color: rgb(220, 220, 220);
}

form {
    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.5);
    margin: 0 auto;
    justify-content: space-between;
    min-width: 60%;
    border-radius: 10rem;
    display: flex;
}

input {
    width: 80%;
    border: 0;
    /* height: 70%; */
    background-color: transparent;
    outline-width: 0;
    text-indent: 1rem;
    overflow: hidden;
    resize: none;
    height: 2.5em;
}

.submit {
    border: 0;
    background-color: transparent;
    color: rgb(0, 102, 255);
    font-size: 1.1em;
    margin-right: 2%;
}

.submit:hover {
    background-color: rgba(0, 0, 0, 0.1);
}


</style>