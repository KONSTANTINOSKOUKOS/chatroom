<template>
    <div class="cont">
        <button @click="switchh('Home');">HOME</button>
        <button @click="switchh('Chat');">CHAT</button>
        <button @click="switchh('User');">USER</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { router } from "../router";

const currentpage = ref('Home');

const switchh = (name: string) => {
    router.push({ name: name }); 
    currentpage.value = name;
}
</script>

<style scoped>
.cont {
    position: fixed;
    bottom: 0;
    min-width: 100vw;
    background-color: #828f98;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

button {
    background-color: #828f98;
    border: 0;
    border-radius: .3rem;
    margin: .7em 0;
    padding: .3em;
}

button:hover {
    filter: brightness(70%);
}
</style>