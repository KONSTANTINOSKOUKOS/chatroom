import { reactive } from 'vue';

const state = reactive({
    watcher: 'george',
    msgs: [],
    user: null,
    scroll: false
});

export interface istate {
    watcher: string,
    msgtype?: { id: number, liked: boolean, sender: string, txt: string, date: number, img: string }
    msgs: { id: number, liked: boolean, sender: string, txt: string, date: number, img: string }[]
    user: null | {}
    scroll: boolean
}
export default state;