import { reactive } from 'vue';

const state = reactive({
    watcher: 'george',
    msgs: [],
    user: null
});

export interface istate {
    watcher: string,
    msgtype?: { id: number, liked: boolean, sender: string, txt: string, date: number, img: string }
    msgs: { id: number, liked: boolean, sender: string, txt: string, date: number, img: string }[]
    user: null | {}
}
export default state;