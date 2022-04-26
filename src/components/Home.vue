<template>
    <Nav />
    <div class="chat-cont">
        <div class="chat">
            <img :src="state.user.photoURL">
            <h1>SuperChat</h1>
            <p>{{ state.msgs[1].txt }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import state from '../store';
import Nav from "./Nav.vue";

console.log(state);

</script>

<style scoped>
.chat-cont {
    margin-top: 10vh;
}

.chat {
    display: flex;
    align-items: center;
    justify-content: ;
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
</style>