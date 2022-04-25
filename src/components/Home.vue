<template>
    <nav>
        <button @click="logout()">Log out</button>
        <img :src="state.user.photoURL">
    </nav>
    <div class="chat-cont">
        <div class="chat">
            <img :src="state.user.photoURL">
            <h1>Contact's Name</h1>
            <p>Hi</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import state from '../store';

const logout = () => {
    signOut(auth).then(() => {
        state.user = null;
    });
};
</script>

<style scoped>
.chat-cont {
    margin-top: 10vh;
}

.chat {
    display: flex;
    align-items: center;
    background-color: aqua;
    /* margin: 1rem 0; */
}

.chat img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    width: 100%;
    min-height: 10%;
    top: 0;
    z-index: 999;
    background-color: rgb(130, 143, 152);
}

nav img {
    width: 2.5rem;
    height: 2.5rem;
    margin: .1rem 1rem;
    border-radius: 50%;
}

nav button {
    margin: auto 0;
    font-size: 1.1em;
    background-color: aqua;
    border: 0;
    border: .15em solid black;
    padding: .3rem;
    border-radius: 10rem;
}
</style>