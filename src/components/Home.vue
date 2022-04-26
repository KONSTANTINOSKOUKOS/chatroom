<template>
    <Nav />
    <div class="chat-cont">
        <div class="chat">
            <img :src="state.user.photoURL">
            <h1>SuperChat</h1>
            <!-- <p>{{ state.msgs[state.msgs.length - 1].txt }}</p> -->
        </div>
    </div>
    <button class="add">+</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getmsgs } from '../firebase';
import state from '../store';
import Nav from "./Nav.vue";

onMounted(() => {
    getmsgs();
});

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
    overflow: hidden;
}

.add {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    border: 0;
    margin: 3rem 4rem;
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