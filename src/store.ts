import { reactive } from 'vue';

const state = reactive({
    watcher: 'george',
    msgs: [],
    user: null
});

export interface istate {
    watcher: string,
    msgtype?: { id: number, liked: boolean, sender: string, txt: string, date: number }
    msgs: { id: number, liked: boolean, sender: string, txt: string, date: number }[]
    user: null | {}
}
export default state;