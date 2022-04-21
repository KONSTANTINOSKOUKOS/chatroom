import { reactive } from 'vue';
import { User } from "firebase/auth";

const state = reactive({
    msgs: [],
    user: null,
});

export interface istate {
    msgtype?: { id: number, liked: string[], sender: string, txt: string, date: number, img: string }
    msgs: { id: number, liked: string[], sender: string, txt: string, date: number, img: string }[]
    user: User
}
export default state;