import state from './store';
import { istate } from './store';
import { Ref } from 'vue';
import { Firestore, doc, setDoc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";


export function getmsgs(coll: any) {
    state.msgs = [];
    const q = query(coll, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (docs) => {
        state.msgs = [];
        docs.forEach(doc => {
            state.msgs.push(doc.data());
        });
    });
};


export async function send(txt: Ref<string>, db: Firestore) {
    if (txt.value != '') {
        const date = Date.now();
        const message: istate['msgtype'] = {
            id: Math.random(),
            liked: [],
            sender: state.user.uid,
            txt: txt.value,
            date: date,
            img: state.user.photoURL,
            name: state.user.displayName
        };
        await setDoc(doc(db, 'messages', date.toString()), message);
        txt.value = '';
    }
};

export async function like(docc: any, ownliked: Ref<boolean>, arrlike: Ref<string[]>) {
    ownliked.value = !ownliked.value;

    let newarr = arrlike.value;
    if (!newarr.includes(state.user.uid)) {
        newarr.push(state.user.uid);
    } else {
        newarr = newarr.filter(item => item != state.user.uid);
    }

    await updateDoc(docc, {
        'liked': newarr
    });
};

export function getlikes(docc: any, ownliked: Ref<boolean>, arrlike: Ref<string[]>) {
    const unsub = onSnapshot(docc, (doc) => {
        arrlike.value = doc.data().liked;
        ownliked.value = arrlike.value.indexOf(state.user.uid) != -1;
    });
};

// export default getmsgs;
// export default send;