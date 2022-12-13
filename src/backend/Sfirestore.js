import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { db } from "../Firebase";



export const Sfirestore = () => {
    const db = getFirestore();

    const [error3, setError3] = useState(null)


    const updateDocument = (id, educat, fluent, language) => {

        const documentRef = doc(db, "users", id);
        const document = {
            educattainment: educat,
            fluency: fluent,
            languagespoken: language
        };
        updateDoc(documentRef, document)
            .then(documentRef => {
                console.log("A New Document Field has been added to an existing document");
            })
            .catch(error => {
                console.log(error);
                setError3(error.message);
            })

    }

    return { error3, updateDocument }
}
