import { reactive } from 'vue';
import { User } from "firebase/auth";

const state = reactive({
    msgs: [],
    user: null,
});

export interface istate {
    msgtype?: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name:string }
    msgs: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name:string }[]
    user: User
}
export default state;