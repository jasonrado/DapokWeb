import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuthContext } from '../backend/UseAuth'
import { useState } from 'react'
import { useSignup } from '../backend/Register'

import { getDoc, collection, doc, getFirestore, query, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { Contributortable, AllContributions } from "../components/ContributionsPage";
import withPermission from "../backend/WithPermission";


export default function Contributions() {
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

        const q = query(collection(db, 'contributions'), orderBy('Status', 'desc'));
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

    const [searchedVal, setSearchedVal] = useState("");

    const keys = ["originallanguage", "originalsentence", "translatedlanguage", "translatedsentence", "Contributor"]
    const search = (data3) => {
        return data3.filter(
            (userr) =>
                keys.some((key) => userr[key].toLowerCase().includes(searchedVal))
        );
    }
    const keys2 = ["originallanguage", "originalsentence", "translatedlanguage", "translatedsentence", "Contributor", "DateApproved"]
    const search2 = (data4) => {
        return data4.filter(
            (userr) =>
                keys2.some((key) => userr[key].toLowerCase().includes(searchedVal))
        );
    }
    return (
        <React.Fragment>

            {CurrentUser.usertype === 'Admin' &&
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

                                        <Link to="/" className="sidebar-menu-link"><img src="assets/images/logo.png" alt="logo" />
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
                                    <div className="card-header pb-0">
                                        <h4 className="title">Contributions</h4>
                                        <ul className="nav-tabs nav filter mt-2">
                                            <li className="nav-item"><a href="#approved-contributions" className="nav-link active" data-bs-toggle="tab">Approve Contributions</a></li>
                                            <li className="nav-item"><a href="#all-contributions" className="nav-link" data-bs-toggle="tab">All Contributions</a></li>

                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                                            <div className="search-wrapper">
                                                <form action="">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form--control ps-5" onChange={(e) => setSearchedVal((e.target.value).toLowerCase())} />
                                                        <button className="btn fs--18px border-0 btn--icon" type="submit"><i className="fas fa-search"></i></button>
                                                    </div>
                                                </form>
                                            </div>


                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane show fade active" id="approved-contributions">
                                                < Contributortable MenuItems={search(menuItems)} />
                                            </div>
                                            <div className="tab-pane fade" id="all-contributions">
                                                < AllContributions MenuItems={search2(menuItems)} />
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
                CurrentUser.usertype === 'Validator' &&
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

                                        <Link to="/" className="sidebar-menu-link"><img src="assets/images/logo.png" alt="logo" />
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
                                    <div className="card-header pb-0">
                                        <h4 className="title">Contributions</h4>
                                        <ul className="nav-tabs nav filter mt-2">
                                            <li className="nav-item"><a href="#approved-contributions" className="nav-link active" data-bs-toggle="tab">Approve Contributions</a></li>
                                            <li className="nav-item"><a href="#all-contributions" className="nav-link" data-bs-toggle="tab">All Contributions</a></li>

                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                                            <div className="search-wrapper">
                                                <form action="">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form--control ps-5" onChange={(e) => setSearchedVal((e.target.value).toLowerCase())} />
                                                        <button className="btn fs--18px border-0 btn--icon" type="submit"><i className="fas fa-search"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                            { /*<div className="d-flex flex-wrap gap-3">
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
           </div>
           */
                                            }

                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane show fade active" id="approved-contributions">
                                                < Contributortable MenuItems={search(menuItems)} />
                                            </div>
                                            <div className="tab-pane fade" id="all-contributions">
                                                < AllContributions MenuItems={search2(menuItems)} />
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





        </React.Fragment >

    )

}
