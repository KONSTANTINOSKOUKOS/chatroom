<template>
    <Nav />
    <div class="chat-cont">
        <div @click="$router.push({ name: 'Chat' });" class="chat">
            <img :src="state.user.photoURL">
            <h1>SuperChat</h1>
            <!-- <p><strong style="font-weight: 700;">{{lastmsg.name}}:</strong> {{ lastmsg.txt }}</p> -->
        </div>
    </div>
    <button class="add">+</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getmsgs } from '../firebase';
import state from '../store';
import Nav from "./Nav.vue";

onMounted(async () => {
    scroll(0, 0);
    getmsgs();
});

const lastmsg = ref(state.msgs[state.msgs.length - 1]);

</script>

<style scoped>
.chat-cont {
    margin-top: 10vh;
}

.chat {
    display: flex;
    align-items: center;
    background-color: aqua;
    padding: 1rem;
    flex-wrap: wrap;
    /* margin: 10rem 0; */
}

.chat img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

.chat h1 {
    margin: 0 auto;
}

.chat p {
    margin-right: auto;
    margin: 0 auto;
    overflow: hidden;
}

.add {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    border: 0;
    margin: 4rem 3rem;
    padding: 0 .3em;
    font-size: 3em;
    border-radius: 50%;
    background-color: rgb(185, 203, 217);
    box-shadow: 1px 1px grey;
}

.add:hover {
    background-color: rgb(130, 143, 152);
}
</style>