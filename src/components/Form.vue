<template>
    <div class="cont">
        <div class="noti" v-if="notif">
            <button @click="handlenotif">
                <img :src="state.msgs[state.msgs.length - 1].img">
            </button>
            <span>&#8964;</span>
        </div>
        <form @submit.prevent="send();">
            <!-- <textarea v-model="msg" placeholder="Πείτε κάτι" cols="30" rows="10"></textarea> -->
            <input type="text" v-model="msg" placeholder="Πείτε κάτι" />
            <button class="submit" type="submit">Send</button>
        </form>
    </div>
    <div ref="dum"></div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { istate } from '../store';
import { Firestore, doc, setDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

const state = inject<istate>('state');
const db = inject<Firestore>('db');
const msg = ref('');
const dum = ref<null | HTMLDivElement>(null);

const coll = collection(db, 'messages');

const notif = ref(false);

const scroll = () => {
    dum.value.scrollIntoView({ behavior: 'smooth' });
}
const handlenotif = () => {
    notif.value = false;
    scroll();
}

onMounted(async () => {
    scroll();
    state.msgs = [];
    const q = query(coll, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (docs) => {
        state.msgs = [];
        docs.forEach(doc => {
            state.msgs.push(doc.data());
        });

        if (state.msgs[state.msgs.length - 1].sender != state.user.uid
            && !isInViewport(dum.value)) {
            notif.value = true;
        }
    });
});

const send = async () => {

    if (msg.value != '') {
        const date = Date.now();
        const message: istate['msgtype'] = {
            id: Math.random(),
            liked: [],
            sender: state.user.uid,
            txt: msg.value,
            date: date,
            img: state.user.photoURL
        };
        await setDoc(doc(db, 'messages', date.toString()), message);
        msg.value = '';
        scroll();
    }
}

const isInViewport = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// document.addEventListener('scroll', () => {
//     if (notif.value && isInViewport(dum.value)) {
//         notif.value = false;
//     }
// })
</script>

<style scoped>
.cont {
    z-index: 999;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.noti button {
    border: 0;
    border-radius: 50%;
    padding: .3rem;
    background-color: rgb(220, 220, 220);
    align-items: center;
}

.noti img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}

.noti span {
    line-height: normal;
    font-size: 3rem;
    padding: 0;
}

form {
    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.5);
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    min-width: 80%;
    border-radius: 10rem;
    display: flex;
    max-height: 3rem;
}

textarea {
    width: 80%;
    border: 0;
    /* height: 70%; */
    background-color: transparent;
    outline-width: 0;
    margin-left: 1rem;
    overflow: auto;
    overflow-wrap: break-word;
    resize: none;
    height: 2.5em;
}

input {
    width: 80%;
    border: 0;
    /* height: 70%; */
    background-color: transparent;
    outline-width: 0;
    margin-left: 1rem;
    overflow-wrap: break-word;
    resize: none;
    min-height: 2.5em;
}

.submit {
    border: 0;
    background-color: transparent;
    color: rgb(0, 149, 246);
    font-size: 1.1em;
    margin-right: 2%;
}

.submit:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>