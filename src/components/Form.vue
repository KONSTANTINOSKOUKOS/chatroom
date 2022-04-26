<template>
    <div class="cont">
        <form @submit.prevent="sendd();">
            <!-- <textarea v-model="msg" placeholder="Πείτε κάτι" cols="30" rows="10"></textarea> -->
            <input type="text" v-model="msg" placeholder="Πείτε κάτι" />
            <button class="submit" type="submit">Send</button>
        </form>
    </div>
    <div ref="dum"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { send, getmsgs } from '../firebase';

const msg = ref('');
const dum = ref<null | HTMLDivElement>(null);

const scroll = () => {
    dum.value.scrollIntoView({ behavior: 'smooth' });
}

onMounted(async () => {
    scroll();
    getmsgs();
});

const sendd = async () => {
    send(msg);
    scroll();
}
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
    color: rgb(0, 153, 255);
    font-size: 1.1em;
    margin-right: 2%;
}

.submit:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>