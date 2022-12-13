import React, { CSSProperties, useEffect } from "react";
import Select, { AriaOnFocus } from 'react-select';
import { Link } from "react-router-dom";
import { useAuthContext } from "../backend/UseAuth";
import { useSignup } from '../backend/Register'
import { getDoc, collection, doc, getFirestore, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import { colourOptions } from "../backend/data";
import { TestsTable } from "../components/TestsPage";

export default function Tests() {
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [loginname, setloginname] = useState(null)
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const handleSubmit = (e) => {
        logout()
    }

    const [CurrentUser, setSingledoc] = useState([]);
    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const style: { [key: string]: CSSProperties } = {
        blockquote: {
            fontStyle: 'italic',
            fontSize: '.75rem',
            margin: '1rem 0',
        },
        label: {
            fontSize: '0.75rem',
            fontWeight: 'bold',
            lineHeight: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };
    const onFocus: AriaOnFocus<ColourOption> = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''
            }`;
        setAriaFocusMessage(msg);
        return msg;
    };
    const [selectedRow, setSelectedRow] = useState('');
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);




    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setSingledoc(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const q = query(collection(db, 'Alltest'));
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

        console.log(menuItems);
        return () => {
            getDomains();
        };
    }, [])

    const [searchedVal, setSearchedVal] = useState("");

    const keys = ["languageanswer", "languagetest", "Author"]
    const search = (data) => {
        return data.filter(
            (userr) =>
                keys.some((key) => userr[key].toLowerCase().includes(searchedVal))
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
                                    <div className="card-header pb-0 d-flex flex-wrap gap-3 justify-content-between align-items-start">
                                        <div className="card-header__left">
                                            <h4 className="title">Tests</h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#all-tests" className="nav-link active" data-bs-toggle="tab">All Tests</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn--success" data-bs-toggle="modal" data-bs-target="#addQuestionModal">Add Test</button>
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
                                            <div className="tab-pane show fade active" id="all-tests">

                                                < TestsTable MenuItems={search(menuItems)} />
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
                                    <div className="card-header pb-0 d-flex flex-wrap gap-3 justify-content-between align-items-start">
                                        <div className="card-header__left">
                                            <h4 className="title">Tests</h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#all-tests" className="nav-link active" data-bs-toggle="tab">All Tests</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn--success" data-bs-toggle="modal" data-bs-target="#addQuestionModal">Add Test</button>
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
                                            <div className="tab-pane show fade active" id="all-tests">

                                                < TestsTable MenuItems={search(menuItems)} />
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


            <div className="modal fade" id="addQuestionModal" tabIndex="-1" aria-labelledby="addQuestionModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content border-0">
                        <div className="modal-body">
                            <form action="">
                                <h4 className="title mb-4 pb-2">Add Test</h4>
                                <div className="form-group mb-3 bg--light rounded-1 mb-5">



                                    <label style={style.label} id="aria-label" htmlFor="aria-example-input">
                                        Language (Test)
                                    </label>


                                    <Select
                                        aria-labelledby="aria-label"
                                        ariaLiveMessages={{
                                            onFocus,
                                        }}
                                        inputId="aria-example-input"
                                        name="aria-live-color"
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        options={colourOptions}
                                    />


                                </div>
                                <div className="form-group mb-3 bg--light rounded-1 mb-5">
                                    <label style={style.label} id="aria-label" htmlFor="aria-example-input">
                                        Language (Answer)
                                    </label>
                                    <Select
                                        aria-labelledby="aria-label"
                                        ariaLiveMessages={{
                                            onFocus,
                                        }}
                                        inputId="aria-example-input"
                                        name="aria-live-color"
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        options={colourOptions}
                                    />
                                </div>
                                <div className="text-end mt-4">
                                    <button type="submit" className="btn btn--success">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}