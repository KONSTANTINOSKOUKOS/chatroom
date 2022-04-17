<template>
    <div :class="msg.sender == state.user.uid ? 'right' : 'left'">
        <img v-if="pfpimg != ''" :src="pfpimg">
        <!-- <span>{{state.user.displayName}}</span> -->
        <img v-else :src="'https://icon-library.com/images/generic-user-icon/generic-user-icon-12.jpg'">
        <p :class="msg.sender == state.user.uid ? 'senders' : 'others'">{{ msg.txt }}</p>
        <button @click="like">{{ liked ? '❤️' : '🤍' }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { istate } from '../store';
import { onSnapshot, query, updateDoc, doc } from 'firebase/firestore'

const db = inject('db');

interface iprops {
    msg: {
        id: number,
        liked: boolean,
        sender: string,
        txt: string,
        date: number,
        img: string
    }
}
const props = defineProps<iprops>();
const pfpimg = ref(props.msg.img);

const state = inject<istate>('state');
const liked = ref(props.msg.liked);

const docc = doc(db, 'messages', props.msg.date.toString());

onMounted(() => {
    const unsub = onSnapshot(docc,(doc)=>{
        console.log(doc.data());
        liked.value = doc.data().liked;
    });
});

const like = async () => {
    liked.value = !liked.value;
    await updateDoc(docc, {
        'liked': liked.value
    });
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
    padding: 0 0.5em;
    margin-right: 1rem;
    border-radius: 1em;
    max-width: 40%;
    overflow-wrap: break-word;
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
    text-align: center;
    color: white;
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

img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

.left img {
    margin-right: 1rem;
}
</style>