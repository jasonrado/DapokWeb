import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuthContext } from '../backend/UseAuth'
import { useState } from 'react'
import { setDoc } from "firebase/firestore/lite";
import { useSignup } from '../backend/Register'
import { getAuth } from "firebase/auth";
import { getDoc, collection, doc, getFirestore, query, orderBy, updateDoc, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";
import { Modal } from "react-bootstrap";


export const Languages = ({ MenuItems }) => {
    const auth = getAuth();
    const [firstname1, setfirstname] = useState("Admin")
    const [lastname2, setlastname] = useState("")
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()

    const [validationError2, setValidationError2] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [menuItems2, setMenuItems2] = useState([]);
    const [menuItems3, setMenuItems3] = useState([]);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState('');
    const handleSubmit = (e) => {
        logout()
    }
    let alertField = '';
    const [newlanguage, setnewlanguage] = useState('');
    const [newdescription, setnewdescription] = useState('');

    const [UserData, setUserData] = useState([]);
    const [addLanguageModal, setAddLanguageModal] = useState(false);
    const [count, setCount] = useState(0)
    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const p = query(collection(db, 'users'), orderBy('usertype', 'desc'));
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

        const q = query(collection(db, 'WebLanguage'));
        const getDomains = onSnapshot(
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
        setfirstname(data.firstname)
        setlastname(data.lastname)
        return () => {
            getDomains();
            getusers();
        };

    }, [count])


    const TurnIntoValidator = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Validator',
            ApprovedBy: UserData.firstname + " " + UserData.lastname
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const TurnIntoContributor = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Contributor',
            ApprovedBy: ''
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };



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


        addDoc(collection(db, 'WebLanguage'), {

            Language: newlanguage,
            Description: newdescription,
            Staff: user.uid

        })

        setAddLanguageModal(false)
        setCount(count + 1)
    }
    const deletedata = (id) => {
        deleteDoc(doc(db, "WebLanguage", id));
    }
    const [data, setdata] = useState('')


    const viewstaffdata = (id) => {

        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setdata(docSnap.data());
                setfirstname(data.firstname)
                setlastname(data.lastname)
                setCount(count + 1)
            } else {

                setfirstname("Admin")
                setlastname("")
                console.log("No such document!");

            }


        })
    }
    const [domainID, setDomainID] = useState('');
    const [editdomain, seteditdomain] = useState('')
    const GetEditDomain = (id) => {
        setSelectedRow({ id });
        setDomainID(id);
        const db = getFirestore();
        getDoc(doc(db, "WebLanguage", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditdomain(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');



    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editdomain.Language
        const transsentdata = editdomain.Description

        if (origsent === '') {
            origsent = origsentdata
        }
        if (transsent === '') {
            transsent = transsentdata
        }
        console.log(domainID);
        const docRef = doc(db, "WebLanguage", domainID);
        const data = {
            Language: origsent,
            Description: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const [approverID, setapproverID] = useState('');
    const [getapprover, setgetapprover] = useState('')
    const getApprovedUser = (id) => {
        setSelectedRow({ id });
        setapproverID(id);
        const db = getFirestore();
        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setgetapprover(docSnap.data());

            } else {
                console.log("No such document!");
            }
        })

    };


    return (
        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>Language</th>
                    <th>Description</th>

                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(
                    MenuItems.map(({ id, Language, Description, Staff }, index) => (

                        <tr key={index} className={`table-row ${selectedRow.Staff === Staff}`}>
                            <td data-label="Domain Name">{Language}</td>
                            <td data-label="Description"><span className="text-xl-start">{Description}</span></td>


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
                                    <input type="text" className="form-control form--control mb-3" placeholder={editdomain.Language} onChange={e => setorigsent(e.target.value)} />
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



export const Validators = ({ MenuItems2 }) => {
    const auth = getAuth();
    const [firstname1, setfirstname] = useState("Admin")
    const [lastname2, setlastname] = useState("")
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()

    const [validationError2, setValidationError2] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [menuItems2, setMenuItems2] = useState([]);
    const [menuItems3, setMenuItems3] = useState([]);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState('');
    const handleSubmit = (e) => {
        logout()
    }
    let alertField = '';
    const [newlanguage, setnewlanguage] = useState('');
    const [newdescription, setnewdescription] = useState('');

    const [UserData, setUserData] = useState([]);
    const [addLanguageModal, setAddLanguageModal] = useState(false);
    const [count, setCount] = useState(0)
    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const p = query(collection(db, 'users'), orderBy('usertype', 'desc'));
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
        const q = query(collection(db, 'user_test_score'), orderBy('score', 'desc'));
        const getscores = onSnapshot(
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
        setfirstname(data.firstname)
        setlastname(data.lastname)
        return () => {
            getscores();
            getusers();
        };

    }, [count])


    const TurnIntoValidator = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Validator',
            ApprovedBy: UserData.firstname + " " + UserData.lastname
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const TurnIntoContributor = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Contributor',
            ApprovedBy: ''
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };



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


        addDoc(collection(db, 'WebLanguage'), {

            Language: newlanguage,
            Description: newdescription,
            Staff: user.uid

        })

        setAddLanguageModal(false)
        setCount(count + 1)
    }
    const deletedata = (id) => {
        deleteDoc(doc(db, "WebLanguage", id));
    }
    const [data, setdata] = useState('')


    const viewstaffdata = (id) => {

        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setdata(docSnap.data());
                setfirstname(data.firstname)
                setlastname(data.lastname)
                setCount(count + 1)
            } else {

                setfirstname("Admin")
                setlastname("")
                console.log("No such document!");

            }


        })
    }
    const [domainID, setDomainID] = useState('');
    const [editdomain, seteditdomain] = useState('')
    const GetEditDomain = (id) => {
        setSelectedRow({ id });
        setDomainID(id);
        const db = getFirestore();
        getDoc(doc(db, "WebLanguage", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditdomain(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');



    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editdomain.Language
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
            Language: origsent,
            Description: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const [approverID, setapproverID] = useState('');
    const [getapprover, setgetapprover] = useState('')
    const getApprovedUser = (id) => {
        setSelectedRow({ id });
        setapproverID(id);
        const db = getFirestore();
        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setgetapprover(docSnap.data());

            } else {
                console.log("No such document!");
            }
        })

    };


    return (
        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Additional Information</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {(
                    MenuItems2.map(({ id, firstname, lastname, email, usertype, educattainment, languagespoken, ApprovedBy }, index) => usertype === "Validator" ? (

                        <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                            <td data-label="Domain Name">{firstname}</td>

                            <td data-label="Staff">{lastname}</td>
                            <td data-label="Staff">{email}</td>
                            <td data-label="Additional Information">
                                <div className="position-relative d-inline-block">
                                    <a href="javascript:void(0)" className="btn btn--md btn--base dropdown-hover">{firstname + " " + lastname}  <i className="las la-angle-down"></i></a>
                                    <div className="dropdown-wrapper">
                                        <div className="dropdown-inner">
                                            <ul className="list list-simple">
                                                <li className="d-flex justify-content-between">
                                                    <span className="fw-semibold text-start">Education</span>
                                                    <span className="text-end">{educattainment}</span>
                                                </li>
                                                <li className="d-flex justify-content-between">
                                                    <span className="fw-semibold text-start">Spoken Language(s)</span>
                                                    <span className="text-end">{languagespoken}</span>
                                                </li>
                                                {(
                                                    menuItems.map(({ uid, original_language, score, translated_language }, index) => uid === id ? (

                                                        <li className="d-flex justify-content-between">
                                                            <span className="fw-semibold text-start">{original_language + "-" + translated_language + " Score "}</span>
                                                            <span className="text-end">{score}</span>
                                                        </li>

                                                    ) : (
                                                        <div></div>
                                                    ))

                                                )}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </td>


                            <td data-label="Status">
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    <button type="submit" className="btn btn--danger btn--icon remove-item" onClick={() => TurnIntoContributor(id)}><i className="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr></tr>
                    )

                    ))}

            </tbody>
        </table>

    )
}


export const Contributors = ({ MenuItems2 }) => {
    const auth = getAuth();
    const [firstname1, setfirstname] = useState("Admin")
    const [lastname2, setlastname] = useState("")
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()

    const [validationError2, setValidationError2] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [menuItems2, setMenuItems2] = useState([]);
    const [menuItems3, setMenuItems3] = useState([]);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState('');
    const handleSubmit = (e) => {
        logout()
    }
    let alertField = '';
    const [newlanguage, setnewlanguage] = useState('');
    const [newdescription, setnewdescription] = useState('');

    const [UserData, setUserData] = useState([]);
    const [addLanguageModal, setAddLanguageModal] = useState(false);
    const [count, setCount] = useState(0)
    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const p = query(collection(db, 'users'), orderBy('usertype', 'desc'));
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

        const q = query(collection(db, 'user_test_score'), orderBy('score', 'desc'));
        const getscores = onSnapshot(
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

        setfirstname(data.firstname)
        setlastname(data.lastname)
        return () => {
            getscores();
            getusers();
        };

    }, [count])


    const TurnIntoValidator = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Validator',
            ApprovedBy: UserData.firstname + " " + UserData.lastname
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const TurnIntoContributor = (id) => {
        setSelectedRow({ id });
        const docRef = doc(db, "users", id);
        const data = {

            usertype: 'Contributor',
            ApprovedBy: ''
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };



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


        addDoc(collection(db, 'WebLanguage'), {

            Language: newlanguage,
            Description: newdescription,
            Staff: user.uid

        })

        setAddLanguageModal(false)
        setCount(count + 1)
    }
    const deletedata = (id) => {
        deleteDoc(doc(db, "WebLanguage", id));
    }
    const [data, setdata] = useState('')


    const viewstaffdata = (id) => {

        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setdata(docSnap.data());
                setfirstname(data.firstname)
                setlastname(data.lastname)
                setCount(count + 1)
            } else {

                setfirstname("Admin")
                setlastname("")
                console.log("No such document!");

            }


        })
    }
    const [domainID, setDomainID] = useState('');
    const [editdomain, seteditdomain] = useState('')
    const GetEditDomain = (id) => {
        setSelectedRow({ id });
        setDomainID(id);
        const db = getFirestore();
        getDoc(doc(db, "WebLanguage", id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditdomain(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

    };
    let [origsent, setorigsent] = useState('');
    let [transsent, settranssent] = useState('');



    const SubmitEditContri = (e) => {
        e.preventDefault();
        const db = getFirestore();
        const origsentdata = editdomain.Language
        const transsentdata = editdomain.Description

        if (origsent === '') {
            origsent = origsentdata
        }
        if (transsent === '') {
            transsent = transsentdata
        }
        console.log(domainID);
        const docRef = doc(db, "WebLanguage", domainID);
        const data = {
            Language: origsent,
            Description: transsent
        }

        updateDoc(docRef, data)
            .then(docRef => {

            })
            .catch(error => {
                console.log(error);
            })

    };
    const [approverID, setapproverID] = useState('');
    const [getapprover, setgetapprover] = useState('')
    const getApprovedUser = (id) => {
        setSelectedRow({ id });
        setapproverID(id);
        const db = getFirestore();
        getDoc(doc(db, "users", id)).then(docSnap => {
            if (docSnap.exists()) {
                setgetapprover(docSnap.data());

            } else {
                console.log("No such document!");
            }
        })

    };


    return (
        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Additional Information</th>

                    <th>Turn Into Validator</th>

                </tr>
            </thead>
            <tbody>

                {(
                    MenuItems2.map(({ id, firstname, lastname, email, Score, languagespoken, educattainment, usertype }, index) => usertype === "Contributor" ? (
                        <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                            <td data-label="Domain Name">{firstname}</td>

                            <td data-label="Staff">{lastname}</td>
                            <td data-label="Staff">{email}</td>
                            <td data-label="Additional Information">
                                <div className="position-relative d-inline-block">
                                    <a href="javascript:void(0)" className="btn btn--md btn--base dropdown-hover">{firstname + " " + lastname}  <i className="las la-angle-down"></i></a>
                                    <div className="dropdown-wrapper">
                                        <div className="dropdown-inner">
                                            <ul className="list list-simple">
                                                <li className="d-flex justify-content-between">
                                                    <span className="fw-semibold text-start">Education</span>
                                                    <span className="text-end">{educattainment}</span>
                                                </li>
                                                <li className="d-flex justify-content-between">
                                                    <span className="fw-semibold text-start">Spoken Language(s)</span>
                                                    <span className="text-end">{languagespoken}</span>
                                                </li>
                                                {(
                                                    menuItems.map(({ uid, original_language, score, translated_language }, index) => uid === id ? (

                                                        <li className="d-flex justify-content-between">
                                                            <span className="fw-semibold text-start">{original_language + "-" + translated_language + " Score "}</span>
                                                            <span className="text-end">{score}</span>
                                                        </li>

                                                    ) : (
                                                        <div></div>
                                                    ))

                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td data-label="Status">
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    <button type="submit" className="btn btn--success btn--sm btn--icon" onClick={() => TurnIntoValidator(id)}> <i className="fas fa-check"></i></button>
                                </div>
                            </td>
                        </tr>




                    ) : (
                        <tr></tr>
                    )

                    ))}

            </tbody>
        </table >

    )
}



