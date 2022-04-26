<template>
    <nav>
        <button @click="logout()">Log out</button>
        <img :src="state.user.photoURL">
    </nav>
</template>

<script lang="ts" setup>
import state from '../store';
import { inject } from 'vue';
import { signOut } from '@firebase/auth';

const auth = inject('auth');

const logout = () => {
    signOut(auth).then(() => {
        state.user = null;
    });
};
</script>

<style scoped>
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