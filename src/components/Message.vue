<template>
    <div :class="ismine() ? 'right' : 'left'">
        <img v-if="pfpimg != '' && ismine() != true" :src="pfpimg">
        <!-- <span>{{state.user.displayName}}</span> -->
        <p :class="msg.sender == state.user.uid ? 'senders' : 'others'">{{ msg.txt }}</p>
        <button @click="like">{{ ownliked ? '&#10084;&#65039;' : '&#129293;' }}</button>
        <span>{{ arrlike.length == 0 ? '' : arrlike.length }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { istate } from '../store';
import { Firestore, onSnapshot, updateDoc, doc } from 'firebase/firestore'

const db = inject<Firestore>('db');

interface iprops {
    msg: {
        id: number,
        liked: string[],
        sender: string,
        txt: string,
        date: number,
        img: string
    }
}
const props = defineProps<iprops>();
const state = inject<istate>('state');

const pfpimg = ref(props.msg.img);

const arrlike = ref(props.msg.liked);
const ownliked = ref(false);

const docc = doc(db, 'messages', props.msg.date.toString());

onMounted(() => {
    const unsub = onSnapshot(docc, (doc) => {
        arrlike.value = doc.data().liked;
        ownliked.value = arrlike.value.indexOf(state.user.uid) != -1;
    });
});

const like = async () => {
    ownliked.value = !ownliked.value;

    let newarr = arrlike.value;
    if (!newarr.includes(state.user.uid)) {
        newarr.push(state.user.uid);
    } else {
        newarr = newarr.filter(item => item != state.user.uid);
    }

    await updateDoc(docc, {
        'liked': newarr
    });
}

const ismine = () => {
    return props.msg.sender == state.user.uid;
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
}

p {
    font-size: 18px;
    font-weight: 400;
    padding: .5vh .7rem;
    border-radius: 1em;
    max-width: 40%;
    overflow-wrap: break-word;
    margin: 0 2.5vw;
}

@media screen and (min-width: 600px) {
    p {
        font-size: 1.7em;
    }
}

.left p {
    background-color: rgb(183, 183, 183);
}

.right {
    flex-direction: row-reverse;
    margin-left: 1rem;
}

.right p {
    background-color: rgb(0, 102, 255);
    color: white;
    margin-right: 2vw;
}

button {
    font-size: 1rem;
    border: 0;
    background-color: rgb(226, 224, 224);
    border-radius: 50%;
    padding: 0.5rem;
    height: fit-content;
}

button:hover {
    filter: brightness(90%);
}

img {
    width: 2rem;
    border-radius: 50%;
    padding: 0;
}
span{
    margin: 0 .5em;
}
</style>
