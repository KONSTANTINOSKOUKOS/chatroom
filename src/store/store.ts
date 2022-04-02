import { reactive } from 'vue';

interface state {
    watcher: string,
    msgs: { id: number, txt: string, sender: string }[]
}

const state:state = reactive({
    watcher: 'george',
    msgs: [],
});

export default state;