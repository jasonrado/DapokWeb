
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuthContext } from '../backend/UseAuth'
import { useState } from 'react'
import { useSignup } from '../backend/Register'

import { getDoc, collection, doc, getFirestore, query, onSnapshot, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

import { Modal } from "react-bootstrap";


export const DomainPage = ({ MenuItems }) => {
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        logout()
    }
    const [validationError2, setValidationError2] = useState(null)

    const [CurrentUser, setUserData] = useState([]);
    const [newlanguage, setnewlanguage] = useState('');
    const [newdescription, setnewdescription] = useState('');
    const [addLanguageModal, setAddLanguageModal] = useState(false);

    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const q = query(collection(db, 'Domains'));
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

        console.log(menuItems);
        return () => {
            unsubscribe();
        };

    }, [])

    const addLanguage = (e) => {
        e.preventDefault()

        if (!newlanguage) {
            setValidationError2('Language cannot be empty')
            return
        }
        else if (!newdescription) {
            setValidationError2('Description cannot be empty')
            return
        }

        setValidationError2(null)


        addDoc(collection(db, 'Domains'), {

            DomainSite: newlanguage,
            Description: newdescription,
            Staff: CurrentUser.firstname + " " + CurrentUser.lastname

        })
        setAddLanguageModal(false)

    }
    const [selectedRow, setSelectedRow] = useState('');
    const [editdomain, seteditdomain] = useState('')
    const GetEditDomain = (id) => {
        setSelectedRow({ id });
        setDomainID(id);
        const db = getFirestore();
        getDoc(doc(db, "Domains", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditdomain(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');

    const [domainID, setDomainID] = useState('');

    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editdomain.DomainSite
        const transsentdata = editdomain.Description

        if (origsent === '') {
            origsent = origsentdata
        }
        if (transsent === '') {
            transsent = transsentdata
        }
        console.log(domainID);
        const docRef = doc(db, "Domains", domainID);
        const data = {
            DomainSite: origsent,
            Description: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

        origsent = origsentdata
        transsent = transsentdata

    };
    const deletedata = (id) => {
        deleteDoc(doc(db, "Domains", id));
    }

    return (
        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>Domain</th>
                    <th>Description</th>
    
                    <th>View Repository</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(
                    MenuItems.map(({ id, DomainSite, Description, Staff }, index) => (

                        <tr key={id}>
                            <td data-label="Domain Name">{DomainSite}</td>
                            <td data-label="Description"><span className="text-xl-start">{Description}</span></td>
                    
                            <td data-label="View Repository">
                                {
                                    <Link to="/repository" state={{ data2: id }} className="btn btn--primary btn--icon"><i className="fas fa-search"></i>
                                    </Link>
                                }
                            </td>
                            <td data-label="Edit"><button className="btn btn--warning btn--icon" data-bs-toggle="modal" data-bs-target="#EditLanguage" onClick={() => GetEditDomain(id)}><i className="fas fa-pen"></i></button></td>
                            <td data-label="Delete"><button className="btn btn--danger btn--icon remove-item" onClick={() => deletedata(id)}><i className="fas fa-trash"></i></button></td>
                        </tr>
                    )

                    ))}


                <div className="modal fade" id="EditLanguage" tabIndex="-1" aria-labelledby="EditLanguage" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content border-0">
                            <div className="modal-body">
                                <form onSubmit={SubmitEditContri}>
                                    <h4 className="title mb-4 pb-lg-2">Edit Language</h4>
                                    <input type="text" className="form-control form--control mb-3" placeholder={editdomain.DomainSite} onChange={e => setorigsent(e.target.value)} />
                                    <textarea name="" id="" cols="30" rows="10" className="form-control form--control" placeholder={editdomain.Description} onChange={e => settranssent(e.target.value)}></textarea>
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
        </table>

    )
}



