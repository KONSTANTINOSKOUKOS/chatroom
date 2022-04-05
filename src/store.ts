import { reactive } from 'vue';

const state = reactive({
    watcher: 'george',
    msgs: [],
    user: null
});

export interface istate {
    watcher: string,
    msgs: { id: number, txt: string, sender: string, liked: boolean }[]
    user: null | {}
}
export default state;