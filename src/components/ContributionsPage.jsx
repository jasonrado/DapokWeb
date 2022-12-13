
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../backend/UseAuth";
import { useState } from 'react'
import { useSignup } from "../backend/Register";

import { getDoc, collection, doc, getFirestore, query, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from "moment";
export const Contributortable = ({ MenuItems }) => {
    const db = getFirestore();
    const auth = getAuth();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const handleSubmit = (e) => {
        logout()
    }
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');
    const [contriID, setcontriID] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editcontri, seteditcontri] = useState([]);
    const [CurrentUser, setCurrentUser] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedRow, setSelectedRow] = useState('');
    const [menuItems2, setMenuItems2] = useState([]);
    const [menuItems3, setMenuItems3] = useState([]);
    const [contriuser, setcontriuser] = useState([]);





    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setCurrentUser(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })



        const q = query(collection(db, 'user_test_score'), orderBy('score', 'desc'));
        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                if (!snapshot.empty) {
                    setMenuItems(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );

        const p = query(collection(db, 'users'));
        const getusers = onSnapshot(
            p,
            snapshot => {
                if (!snapshot.empty) {
                    setMenuItems2(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );




        console.log(menuItems);

        console.log(menuItems3);
        return () => {
            unsubscribe();


        };

    }, [])

    const getuserstats = (id) => {

        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setcontriuser(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };

    const AcceptContri = (id, repoid, translang, transsent) => {
        setSelectedRow({ id });
        const db = getFirestore();
        const user2 = auth.currentUser;

        const docRef = doc(db, "contributions", id);
        const data = {
            Status: 'Accepted',
            ApprovedBy: user.uid,
            DateApproved: moment().format('ll'),
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })
        const docRef2 = doc(db, "Repository", repoid);
        if (translang === 'Tagalog') {
            const data2 = {
                Tagalog: transsent,
            }
            updateDoc(docRef2, data2)
                .then(docRef2 => {

                })
                .catch(error => {
                    console.log(error);
                })

        }
        else if (translang === 'Cebuano') {
            const data2 = {
                Cebuano: transsent,
            }
            updateDoc(docRef2, data2)
                .then(docRef2 => {

                })
                .catch(error => {
                    console.log(error);
                })

        }
        else if (translang === 'Mandaya') {
            const data2 = {
                Mandaya: transsent,
            }
            updateDoc(docRef2, data2)
                .then(docRef2 => {

                })
                .catch(error => {
                    console.log(error);
                })

        }



    };
    const RejectContriu = (id) => {
        setSelectedRow({ id });
        const db = getFirestore();
        const user2 = auth.currentUser;
        const docRef = doc(db, "contributions", id);
        const data = {
            Status: 'Rejected',
            ApprovedBy: user.uid,
            DateApproved: moment().format('ll'),
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };

    const GetEditContri = (id) => {
        setSelectedRow({ id });
        setcontriID(id);
        const db = getFirestore();
        getDoc(doc(db, "contributions", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditcontri(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editcontri.originalsentence
        const transsentdata = editcontri.translatedsentence

        if (origsent === '') {
            origsent = origsentdata
        }
        if (transsent === '') {
            transsent = transsentdata
        }
        console.log(contriID);
        const docRef = doc(db, "contributions", contriID);
        const data = {
            originalsentence: origsent,
            translatedsentence: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    return (
        <table className="table table--responsive--xl2">
            <thead>
                <tr>
                    <th>Original Language</th>
                    <th>Original Sentence</th>
                    <th>Translated Language</th>
                    <th>Translated Sentence</th>
                    <th>Contributor</th>

                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {(
                    menuItems.map(({ uid, score, original_language, translated_language }, index) =>
                    (


                        (

                            menuItems2.map(({ id, firstname, lastname, languagespoken, educattainment }, index) => ((uid === id)) ? (
                                (

                                    MenuItems.map(({ id, UserID, originallanguage, originalsentence, translatedlanguage, translatedsentence, Contributor, Status, RepoID }, index) => ((uid === UserID) && (Status === "Pending") && (original_language == originallanguage) && (translated_language == translatedlanguage)) ?
                                        (
                                            < tr key={index} className={`table-row ${selectedRow.id === id}`} >

                                                <td data-label="Original Language">{originallanguage}</td>
                                                <td data-label="Original Sentence">{originalsentence}</td>
                                                <td data-label="Translated Language">{translatedlanguage}</td>
                                                <td data-label="Translated Sentence">{translatedsentence}</td>
                                                <td data-label="Contributor">
                                                    <div className="position-relative d-inline-block">
                                                        <a href="javascript:void(0)" className="btn btn--md btn--base dropdown-hover">{Contributor} <i className="las la-angle-down"></i></a>
                                                        <div className={"dropdown-wrapper"}>

                                                            <div className="dropdown-inner" >
                                                                <ul className="list list-simple">
                                                                    <li className="d-flex justify-content-between">
                                                                        <span className="fw-semibold text-start">Education</span>
                                                                        <span className="text-end">{educattainment}</span>
                                                                    </li>
                                                                    <li className="d-flex justify-content-between">
                                                                        <span className="fw-semibold text-start">Spoken Language(s)</span>
                                                                        <span className="text-end">{languagespoken}</span>
                                                                    </li>
                                                                    <li className="d-flex justify-content-between">
                                                                        <span className="fw-semibold text-start">{"Score for " + original_language + "-" + translated_language + " Test: "}</span>
                                                                        <span className="text-end">{score}</span>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td data-label="Status">
                                                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                                                        <button className="btn btn--success btn--sm btn--icon" onClick={() => AcceptContri(id, RepoID, translatedlanguage, translatedsentence)}> <i className="fas fa-check"></i></button>
                                                        <a href="javascript:void(0)" className="btn btn--danger btn--sm remove-item btn--icon" onClick={() => RejectContriu(id)}><i className="fas fa-times"></i></a>
                                                        <a data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri(id)} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></a>
                                                    </div>
                                                </td>

                                            </tr>

                                        ) : (
                                            <tr></tr>
                                        )
                                    ))

                            ) : (
                                <tr></tr>
                            ))
                        )

                    )

                    ))}

                <div className="modal fade" id="EditContribution" tabIndex="-1" aria-labelledby="EditContribution" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content border-0">
                            <div className="modal-body">
                                <form onSubmit={SubmitEditContri}>
                                    <h4 className="title mb-4 pb-lg-2">Edit Contribution</h4>
                                    <input type="text" className="form-control form--control mb-3" disabled={true} placeholder={editcontri.originalsentence} onChange={e => setorigsent(e.target.value)} />
                                    <textarea name="" id="" cols="30" rows="10" className="form-control form--control" placeholder={editcontri.translatedsentence} onChange={e => settranssent(e.target.value)}></textarea>
                                    <div className="d-flex flex-wrap justify-content-end mt-4">
                                        <button type="submit" className="btn btn--success" data-bs-toggle="modal"
                                            data-bs-dismiss="modal">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </tbody>

        </table >

    );
};
export const AllContributions = ({ MenuItems }) => {
    const db = getFirestore();
    const auth = getAuth();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const handleSubmit = (e) => {
        logout()
    }
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');
    const [contriID, setcontriID] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editcontri, seteditcontri] = useState([]);
    const [CurrentUser, setCurrentUser] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedRow, setSelectedRow] = useState('');
    const [menuItems2, setMenuItems2] = useState([]);
    const [contriuser, setcontriuser] = useState([]);





    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setCurrentUser(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const q = query(collection(db, 'contributions'), orderBy('UserID', 'desc'));
        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                if (!snapshot.empty) {
                    setMenuItems(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );

        const p = query(collection(db, 'users'), orderBy('uid', 'asc'));
        const getusers = onSnapshot(
            p,
            snapshot => {
                if (!snapshot.empty) {
                    setMenuItems2(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );


        console.log(menuItems);
        return () => {
            unsubscribe();
        };

    }, [])

    const getuserstats = (id) => {

        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setcontriuser(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };

    const AcceptContri = (id) => {
        setSelectedRow({ id });
        const db = getFirestore();
        const user2 = auth.currentUser;
        const docRef = doc(db, "contributions", id);
        const data = {
            Status: 'Accepted',
            ApprovedBy: user.uid,
            DateApproved: moment().format('ll'),
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const RejectContriu = (id) => {
        setSelectedRow({ id });
        const db = getFirestore();
        const user2 = auth.currentUser;
        const docRef = doc(db, "contributions", id);
        const data = {
            Status: 'Rejected',
            ApprovedBy: user.uid,
            DateApproved: moment().format('ll'),
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };

    const GetEditContri = (id) => {
        setSelectedRow({ id });
        setcontriID(id);
        const db = getFirestore();
        getDoc(doc(db, "contributions", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditcontri(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editcontri.originalsentence
        const transsentdata = editcontri.translatedsentence

        if (origsent === '') {
            origsent = origsentdata
        }
        if (transsent === '') {
            transsent = transsentdata
        }
        console.log(contriID);
        const docRef = doc(db, "contributions", contriID);
        const data = {
            originalsentence: origsent,
            translatedsentence: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    return (
        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>Original Language</th>
                    <th>Original Sentence</th>
                    <th>Translated Language</th>
                    <th>Translated Sentence</th>
                    <th>Contributor</th>
                    <th>Approved by</th>
                    <th>Date Approved</th>
                </tr>
            </thead>
            <tbody>
                {
                    menuItems2.map(({ id, firstname, lastname }, index) => (


                        (

                            MenuItems.map(({ originallanguage, originalsentence, translatedlanguage, translatedsentence, Contributor, ApprovedBy, DateApproved, Status }, index) => ((id === ApprovedBy) && (Status === "Accepted")) ? (
                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                    <td data-label="Original Language">{originallanguage}</td>
                                    <td data-label="Original Sentence">{originalsentence}</td>
                                    <td data-label="Translated Language">{translatedlanguage}</td>
                                    <td data-label="Translated Sentence">{translatedsentence}</td>
                                    <td data-label="Contributor">{Contributor}</td>
                                    <td data-label="Approved By">{firstname + " " + lastname}</td>
                                    <td data-label="Date Approved">{DateApproved}</td>
                                </tr>
                            ) : (
                                <tr></tr>
                            ))
                        )

                    )
                    )}

            </tbody>

        </table>)
}



