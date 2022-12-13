import { getFirestore } from "firebase/firestore";
const db = getFirestore();
function getAllMenuItems() {
    return new Promise((resolve, reject) => {
        db.collection("contributions").get().then((allMenuItems) => {
            resolve(allMenuItems);
        }).catch((e) => {
            reject(e);
        })
    })
}
export default { getAllMenuItems }