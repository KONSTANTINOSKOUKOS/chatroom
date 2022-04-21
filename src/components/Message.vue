<template>
    <div :class="msg.sender == state.user.uid ? 'right' : 'left'">
        <img v-if="pfpimg != ''" :src="pfpimg">
        <!-- <span>{{state.user.displayName}}</span> -->
        <img v-else :src="'https://icon-library.com/images/generic-user-icon/generic-user-icon-12.jpg'">
        <p :class="msg.sender == state.user.uid ? 'senders' : 'others'">{{ msg.txt }}</p>
        <button @click="like">{{ ownliked ? '&#10084;&#65039;' : '&#129293;' }}</button>
        <span style="color: white;">{{ arrlike.length ==0 ? '' : arrlike.length }}</span>
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
        ownliked.value=arrlike.value.includes(state.user.uid);
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

</script>

<style scoped>
div {
    display: flex;
    margin: .5rem;
    align-items: center;
}

p {
    font-size: 1.5em;
    padding: 0 0.5em;
    border-radius: 1em;
    max-width: 40%;
    overflow-wrap: normal;
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
    transform: scale(40%);
    border-radius: 50%;
    padding: 0;
    margin-left: 0;
}

.left img {
    margin-right: 0;
}
</style>
