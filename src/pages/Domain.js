import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuthContext } from '../backend/UseAuth'
import { useState } from 'react'
import { useSignup } from '../backend/Register'

import { getDoc, collection, doc, getFirestore, query, onSnapshot, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

import { Modal } from "react-bootstrap";
import { DomainPage } from "../components/DomainsPage";



export default function Domain() {

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
    const [searchedVal, setSearchedVal] = useState("");
    const keys2 = ["DomainSite", "Description", "Staff"]
    const search2 = (data4) => {
        return data4.filter(
            (userr) =>
                keys2.some((key) => userr[key].toLowerCase().includes(searchedVal))
        );
    }

    return (
        <React.Fragment>
            {
                CurrentUser.usertype === 'Admin' &&


                <div className="main-body-wrapper d-flex">

                    <div className="sidebar-wrapper bg--accent">
                        <div className="sidebar-inner">
                            <ul className="sidebar-menu">
                                <li className="sidebar-menu-item">
                                    {
                                        <Link to="/contributions" className="sidebar-menu-link"><img src="assets/images/icon/menu1.png" alt="icon" />
                                        </Link>
                                    }
                                </li>
                                <li className="sidebar-menu-item">
                                    {
                                        <Link to="/tests" className="sidebar-menu-link"><img src="assets/images/icon/menu2.png" alt="icon" />
                                        </Link>
                                    }
                                </li>
                                <li className="sidebar-menu-item">
                                    {
                                        <Link to="/domain" className="sidebar-menu-link"> <img src="assets/images/icon/menu3.png" alt="icon" />
                                        </Link>
                                    }
                                </li>

                                <li className="sidebar-menu-item">
                                    {
                                        <Link to="/lists" className="sidebar-menu-link"> <img src="assets/images/icon/menu5.png" alt="icon" />
                                        </Link>
                                    }
                                </li>
                                <li className="sidebar-menu-item">
                                    {
                                        <Link to="/profile" className="sidebar-menu-link"> <img src="assets/images/icon/menu6.png" alt="icon" />
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="main-content">
                        <div className="main-content-inner">

                            <div className="top-menu-wrapper bg-white">
                                <div className="top-menu-inner d-flex flex-wrap gap-2 justify-content-between">
                                    <div className="d-sm-block">
                                        <div className="sidebar-toggler fs--20px d-md-none"><i className="fas fa-bars"></i></div>
                                    </div>
                                    {

                                        <Link to="/home" className="sidebar-menu-link"><img src="assets/images/logo.png" alt="logo" />
                                        </Link>
                                    }

                                    <ul className="top-menu d-flex flex-wrap gap-3">

                                        <li className="top-menu-item">
                                            <a href="javascript:void(0)" className="top-menu-link"><i className="fas fa-user"></i></a>
                                            <div className="dropdown-wrapper">
                                                <div className="dropdown-inner">
                                                    <ul className="notification">
                                                        <li className="notification-item border-0">
                                                            <div className="d-flex gap-3">
                                                                <div className="notification-item__thumb">
                                                                    <i className="fas fa-user"></i>
                                                                </div>
                                                                <div className="notification-item__content">
                                                                    {
                                                                        CurrentUser.firstname && <h6 className="notification-item__content-name">
                                                                            {CurrentUser.firstname + " " + CurrentUser.lastname}
                                                                        </h6>
                                                                    }
                                                                    <p>{CurrentUser.usertype}</p>
                                                                    {
                                                                        <Link to="/profile" className="mt-3 d-block fs--14px fw-semibold">Edit Profile
                                                                        </Link>
                                                                    }
                                                                    {
                                                                        <Link to="/" onClick={handleSubmit} className="mt-1 d-block fs--14px fw-semibold text--danger">  Log Out
                                                                        </Link>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="main-content-inner-inner">
                                <div className="card custom--card">
                                    <div className="card-header pb-0 d-flex flex-wrap gap-3 justify-content-between align-items-start">
                                        <div className="card-header__left">
                                            <h4 className="title">Domains</h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#all-domains" className="nav-link active" data-bs-toggle="tab">All Domains</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn--success" onClick={() => setAddLanguageModal(true)}>Add Domain</button>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                                            <div className="search-wrapper">
                                                <form onSubmit="">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form--control ps-5" onChange={(e) => setSearchedVal((e.target.value).toLowerCase())} />
                                                        <button className="btn fs--18px border-0 btn--icon" type="submit"><i className="fas fa-search"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/*
                                                <div className="d-flex flex-wrap gap-3">
    
                                                    <select>
                                                        <option value="">Filter by</option>
                                                        <option value="">Upper to Low</option>
                                                        <option value="">Lower to Upper</option>
                                                    </select>
                                                    <select>
                                                        <option value="">Filter by</option>
                                                        <option value="">Upper to Low</option>
                                                        <option value="">Lower to Upper</option>
                                                    </select>
                                                </div>*/
                                            }

                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane show fade active" id="all-tests">
                                                < DomainPage MenuItems={search2(menuItems)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                CurrentUser.usertype === 'Contributor' &&

                <Link to="/" onClick={handleSubmit}>
                    <h1>You are Unauthorized to use this Page </h1></Link>
            }
            {
                CurrentUser.usertype === 'Validator' &&

                <Link to="/contributions">
                    <h1>You are Unauthorized to use this Page </h1></Link>
            }

            <Modal show={addLanguageModal} onShow={() => setValidationError2("")} onEscapeKeyDown={() => setAddLanguageModal(false)} onHide={() => setAddLanguageModal(false)} fade="false" animation="false" style={{
                top: '20%'
            }}>


                <div className="modal-dialog modal-dialog-centered modal-md" style={{
                    width: '500px', position: 'absolute', height: '125px'
                }}>
                    <div className="modal-content border-0" style={{
                        width: '500px', position: 'center', top: '100%'
                    }}>
                        <div className="modal-body" >
                            <form onSubmit={addLanguage}>
                                <h4 className="title mb-4 pb-lg-2">Add Domain</h4>

                                <input type="text" className="form-control form--control  mb-3" placeholder="Language" onChange={e => setnewlanguage(e.target.value)} />
                                <textarea name="" id="" cols="30" rows="10" className="form-control form--control" placeholder="Description" onChange={e => setnewdescription(e.target.value)}></textarea>
                                <div>
                                    {
                                        validationError2 && <div className="text-center mt-3 mt-sm-4" >
                                            {validationError2}
                                        </div>
                                    }

                                </div>
                                <div className="d-flex flex-wrap justify-content-end mt-4">
                                    <button type="submit" className="btn btn--success">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </Modal>


        </React.Fragment>
    )
}