import React, { CSSProperties, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Select, { AriaOnFocus } from 'react-select';
import { useAuthContext } from "../backend/UseAuth";
import { useSignup } from '../backend/Register'
import { getDoc, collection, doc, getFirestore, query, onSnapshot, orderBy, addDoc, arrayUnion, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import { TestOption, testOptions, testOptions2 } from "../backend/data";
import { TestQuestionnaireTable } from "../components/TestsPage";
import { Modal } from "react-bootstrap";
export default function Tests2(props) {
    const location = useLocation();

    const data = location.state?.data;

    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const handleSubmit = (e) => {
        logout()
    }

    let [editquestion2, seteditquestion] = useState('');
    let [editoption1, seteditoption1] = useState('');
    let [editoption2, seteditoption2] = useState('');
    let [editoption3, seteditoption3] = useState('');
    let [editoption4, seteditoption4] = useState('');
    let [editanswer, seteditanswer] = useState('');
    const [addQuestionnaire, setaddQuestionnaire] = useState(false)
    const [validationError, setValidationError] = useState(null);
    const [question1, setquestion1] = useState('');
    const [optionn1, setoption1] = useState('');
    const [optionn2, setoption2] = useState('');
    const [optionn3, setoption3] = useState('');
    const [optionn4, setoption4] = useState('');

    const [answerr, setanswer] = useState('');
    const [selectedRow, setSelectedRow] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);

    const [error, setError] = useState(null);



    const [CurrentUser, setSingledoc] = useState([]);
    const [singleDoc2, setSingledoc2] = useState([]);


    const [validationError2, setValidationError2] = useState(null);
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleChange = (options) => {

        if (options.value === "Option1") {
            setanswer(optionn1)
        }
        if (options.value === "Option2") {
            setanswer(optionn2)
        }
        if (options.value === "Option3") {
            setanswer(optionn3)
        }
        if (options.value === "Option4") {
            setanswer(optionn4)
        }

    };
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

    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
    const onFocus: AriaOnFocus<TestOption> = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''
            }`;
        setAriaFocusMessage(msg);
        return msg;
    };

    const [count, setcount] = useState(0)
    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setSingledoc(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })


        getDoc(doc(db, "Alltest", data)).then(docSnap => {
            if (docSnap.exists()) {
                setSingledoc2(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })

        const q = query(collection(db, 'testquestions'), orderBy('testid', 'desc'));
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

    }, [count])
    const addTest = (e) => {
        e.preventDefault()

        if (!optionn1) {
            setValidationError('Options cannot be empty')
            return
        }
        else if (!optionn2) {
            setValidationError('Options cannot be empty')
            return
        }
        else if (!optionn3) {
            setValidationError('Options cannot be empty')
            return
        }
        else if (!optionn4) {
            setValidationError('Options cannot be empty')
            return
        }
        else if (!question1) {
            setValidationError('Question cannot be empty')
            return
        }
        else if (!answerr) {
            setValidationError('Please Select the answer')
            return
        }



        setValidationError(null)
        addDoc(collection(db, 'testquestions'), {
            answer: answerr,
            correct_option: answerr,
            options: arrayUnion(optionn1, optionn2, optionn3, optionn4),
            original_language: singleDoc2.languagetest,
            question: question1,
            testid: data,
            translated_language: singleDoc2.languageanswer

        })
        setaddQuestionnaire(false)





    }


    const [searchedVal, setSearchedVal] = useState("");
    const keys2 = ["answer", "question"]
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
                                            <h4 className="title">
                                                {
                                                    <Link to="/tests" className="back-btn p-3 lh-1">   <i className="fas fa-angle-left"></i>
                                                        {" " + singleDoc2.languagetest + " - " + singleDoc2.languageanswer + " Test Questions"}
                                                    </Link>
                                                }
                                            </h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#all-tests" className="nav-link active" data-bs-toggle="tab">All Questions</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn--success" onClick={() => setaddQuestionnaire(true)}>Add Question</button>
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
                                            <div className="tab-pane show fade active" id="all-tests">
                                                < TestQuestionnaireTable MenuItems={search2(menuItems)} />
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
                                            <h4 className="title">
                                                {
                                                    <Link to="/tests" className="back-btn p-3 lh-1">   <i className="fas fa-angle-left"></i>
                                                        {" " + singleDoc2.languagetest + " - " + singleDoc2.languageanswer + " Test Questions"}
                                                    </Link>
                                                }
                                            </h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#all-tests" className="nav-link active" data-bs-toggle="tab">All Questions</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn--success" onClick={() => setaddQuestionnaire(true)}>Add Question</button>
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
                                            <div className="tab-pane show fade active" id="all-tests">
                                                < TestQuestionnaireTable MenuItems={search2(menuItems)} />
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






            <Modal show={addQuestionnaire} outline onShow={() => setValidationError2("")} onEscapeKeyDown={() => setaddQuestionnaire(false)} onHide={() => setaddQuestionnaire(false)} fade="false" animation="false" style={{
                top: '14%'
            }}>
                <div className="modal-dialog modal-dialog-centered modal-xl" style={{
                    width: '1140px', position: 'absolute', left: '-65%'
                }}>
                    <div className="modal-content border-0">
                        <div className="modal-body">
                            <form onSubmit={addTest}>
                                <h4 className="title mb-4 pb-lg-2">Add Test Question</h4>
                                <div className="row gy-3 gx-xl-5">
                                    <div className="col-12">
                                        <textarea name="" id="" cols="30" rows="10" className="form-control form--control" onChange={e => setquestion1(e.target.value)} placeholder="Question"></textarea>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row gy-3 gx-3 gx-xl-5">
                                            <div className="col-12">
                                                <input type="text" className="form-control form--control" onChange={e => setoption1(e.target.value)} placeholder="Option 1" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row gy-3 gx-3 gx-xl-5">
                                            <div className="col-12">
                                                <input type="text" className="form-control form--control" onChange={e => setoption2(e.target.value)} placeholder="Option 2" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row gy-3 gx-3 gx-xl-5">
                                            <div className="col-12">
                                                <input type="text" className="form-control form--control" onChange={e => setoption3(e.target.value)} placeholder="Option 3" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row gy-3 gx-3 gx-xl-5">
                                            <div className="col-12">
                                                <input type="text" className="form-control form--control" onChange={e => setoption4(e.target.value)} placeholder="Option 4" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-between mt-4">
                                        <Select
                                            aria-labelledby="aria-label"
                                            ariaLiveMessages={{
                                                onFocus,
                                            }}
                                            inputId="aria-example-input"
                                            name="aria-live-color"
                                            onMenuOpen={onMenuOpen}
                                            onMenuClose={onMenuClose}
                                            placeholder={"Select Answer"}
                                            options={testOptions}
                                            onChange={handleChange}
                                        />
                                        <div>
                                            {
                                                validationError && <div className="text-center mt-3 mt-sm-4" >
                                                    {validationError}
                                                </div>
                                            }

                                        </div>

                                        <button type="submit" className="btn btn--accent">Submit</button>



                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



            </Modal>


        </React.Fragment >
    )
}