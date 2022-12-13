import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../backend/UseAuth";
import { useSignup } from '../backend/Register'
import { getDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { EmailAuthProvider, getAuth, updateEmail, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import Select, { InputActionMeta } from 'react-select';
import { languagefluency, LanguageFluency, educAttainment } from "../backend/data";

export default function Profile() {
    const auth = getAuth();
    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const handleSubmit = (e) => {
        logout()
    }

    const [CurrentUser, setCurrentUser] = useState([]);
    let [educ, setEduc] = useState('');
    let [fluency2, setFluency] = useState('');
    let [language, setLanguage] = useState('');
    let [fname, setfname] = useState('');
    let [lname, setlname] = useState('');
    let [email2, setemail] = useState('');
    let [newpassword, setpassword2] = useState('');
    let [currentpassword, setpassword1] = useState('');
    let [newpassword2, setpassword3] = useState('');

    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setCurrentUser(docSnap.data());

            } else {
                console.log("No such document!");
            }

        })

    }, [])

    const resetUserPassword = async () => {
        const user = auth.currentUser;

        const cred = EmailAuthProvider.credential(user.email, currentpassword);

        try {
            await reauthenticateWithCredential(user, cred)

            if (newpassword === newpassword2) {
                await updatePassword(auth.currentUser, newpassword).then(() => {
                    alert("Password Successfully Changed")
                    window.location.reload(false)
                }).catch((error) => {


                    console.log(error)

                });
            }
            else {
                alert("Password doesn't match")
            }

        } catch (e) {
            console.log(e.code, e.message)

            alert("Invalid Password")
        }
    }


    const educattainmentchange = (e) => {
        setSelected(e.value)

    };




    const handleSubmit3 = (e) => {
        e.preventDefault();
        const fname2 = CurrentUser.firstname

        const lname2 = CurrentUser.lastname
        const educ3 = CurrentUser.educattainment
        const language2 = CurrentUser.languagespoken

        const email3 = CurrentUser.email

        if (fname === '') {
            fname = fname2
        }
        if (lname === '') {
            lname = lname2
        }
        if (educ === '') {
            educ = educ3
        }
        if (language === '') {
            language = language2

        }

        if (email2 === '') {
            email2 = email3
        }

        const db = getFirestore();
        const user2 = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        updateEmail(user2, email2).then(() => {
            const data = {
                firstname: fname,
                lastname: lname,
                email: email2

            }
            updateDoc(docRef, data)
                .then(docRef => {
                    console.log("profile has been updated");

                    window.location.reload(false)
                })
                .catch(error => {
                    console.log(error);
                })
        }).catch((error) => {
            console.log(user2.uid)
            console.log(user2)
            console.log(error)
        });



    }



    const handleSubmit2 = (e) => {
        e.preventDefault();

        const educ3 = CurrentUser.educattainment
        const language2 = CurrentUser.languagespoken
        const length = selectedValue.length;
        for (let i = 0; i < length; i++) {
            valuuue = valuuue + "" + selectedValue[i] + ", "
            console.log(selectedValue[i])
        }

        if (selected === '') {
            selected = educ3
        }
        if (valuuue === '') {
            valuuue = language2

        }



        const db = getFirestore();
        const user2 = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        updateEmail(user2, email2).then(() => {
            const data = {
                educattainment: selected,
                languagespoken: valuuue
            }
            updateDoc(docRef, data)
                .then(docRef => {

                    window.location.reload(false)
                })
                .catch(error => {
                    console.log(error);
                })
        }).catch((error) => {
            console.log(user2.uid)
            console.log(user2)
            console.log(error)
        });



    }

    const options = [
        { value: 'Filipino', label: 'Filipino' },
        { value: 'Cebuano', label: 'Cebuano' },
        { value: 'Mandaya', label: 'Mandaya' }
    ];

    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);



    let [selected, setSelected] = useState("");



    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const onInputChange = (
        inputValue: string,
        { action, prevInputValue }: InputActionMeta
    ) => {
        if (action === 'input-change') return inputValue;
        if (action === 'menu-close') {
            if (prevInputValue) setMenuIsOpen(true);
            else setMenuIsOpen(undefined);
        }
        return prevInputValue;
    };

    const [selectedValue, setSelectedValue] = useState([]);
    const addoptionvalue = (e) => {

        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);

    }
    let [valuuue, setvaluuue] = useState('');


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
                                            <h4 className="title">Edit Profile</h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#personal" className="nav-link active" data-bs-toggle="tab">User Information</a></li>
                                                <li className="nav-item"><a href="#password" className="nav-link" data-bs-toggle="tab">Password</a></li>
                                                <li className="nav-item"><a href="#education" className="nav-link" data-bs-toggle="tab">Education Attainment</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="tab-pane show fade active" id="personal">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-6 col-lg-10 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">First Name</label>
                                                                    <input type="text" className="form-control form--control h-45" placeholder={CurrentUser.firstname} onChange={e => setfname(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">Last Name</label>
                                                                    <input type="text" className="form-control form--control h-45" placeholder={CurrentUser.lastname} onChange={e => setlname(e.target.value)} />
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button data-bs-toggle="modal" data-bs-target="#saveModal" className="btn btn--accent" onClick={handleSubmit3}>Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="password">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-4 col-lg-7 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px" >Current Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword1(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px" >New Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword2(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">Re-type Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword3(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button onClick={resetUserPassword} data-bs-target="#saveModal" className="btn btn--accent" className="btn btn--accent">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="education">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-4 col-lg-7 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-5">
                                                                    <label className="form-label">Highest Educational Attainment</label>
                                                                    <Select

                                                                        inputId="aria-example-input"
                                                                        name="aria-live-color"
                                                                        onMenuOpen={onMenuOpen}
                                                                        onMenuClose={onMenuClose}
                                                                        options={educAttainment}
                                                                        placeholder={CurrentUser.educattainment}
                                                                    />
                                                                </div>
                                                                <div className="form-group mb-5">
                                                                    <label className="form-label">Language Spoken and Fluency</label>
                                                                    <Select
                                                                        isMulti
                                                                        defaultValue={languagefluency[0]}
                                                                        isClearable
                                                                        isSearchable
                                                                        onInputChange={onInputChange}
                                                                        name="color"
                                                                        options={languagefluency}
                                                                        menuIsOpen={menuIsOpen}
                                                                        onChange={addoptionvalue}
                                                                        placeholder={CurrentUser.languagespoken}

                                                                        value={languagefluency.filter(obj => selectedValue.includes(obj.value))}
                                                                    />
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button data-bs-toggle="modal" data-bs-target="#saveModal" onClick={handleSubmit2} className="btn btn--accent">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {CurrentUser.usertype === 'Validator' &&
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
                                            <h4 className="title">Edit Profile</h4>
                                            <ul className="nav-tabs nav filter mt-2">
                                                <li className="nav-item"><a href="#personal" className="nav-link active" data-bs-toggle="tab">User Information</a></li>
                                                <li className="nav-item"><a href="#password" className="nav-link" data-bs-toggle="tab">Password</a></li>
                                                <li className="nav-item"><a href="#education" className="nav-link" data-bs-toggle="tab">Education Attainment</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="tab-pane show fade active" id="personal">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-6 col-lg-10 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">First Name</label>
                                                                    <input type="text" className="form-control form--control h-45" placeholder={CurrentUser.firstname} onChange={e => setfname(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">Last Name</label>
                                                                    <input type="text" className="form-control form--control h-45" placeholder={CurrentUser.lastname} onChange={e => setlname(e.target.value)} />
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button data-bs-toggle="modal" data-bs-target="#saveModal" className="btn btn--accent" onClick={handleSubmit3}>Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="password">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-4 col-lg-7 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px" >Current Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword1(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px" >New Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword2(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label className="form-label fw-bold fs--15px">Re-type Password</label>
                                                                    <input type="password" className="form-control form--control h-45" onChange={e => setpassword3(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button onClick={resetUserPassword} className="btn btn--accent">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="education">
                                                <div className="row justify-content-center py-5">
                                                    <div className="col-xxl-4 col-lg-7 col-md-10">
                                                        <div className="row gy-4 gx-lg-5">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-5">
                                                                    <label className="form-label">Highest Educational Attainment</label>
                                                                    <Select

                                                                        inputId="aria-example-input"
                                                                        name="aria-live-color"
                                                                        onMenuOpen={onMenuOpen}
                                                                        onMenuClose={onMenuClose}
                                                                        options={educAttainment}
                                                                        onChange={educattainmentchange}
                                                                        placeholder={CurrentUser.educattainment}
                                                                    />
                                                                </div>
                                                                <div className="form-group mb-5">
                                                                    <label className="form-label">Language Spoken and Fluency</label>
                                                                    <Select
                                                                        isMulti

                                                                        isClearable
                                                                        isSearchable
                                                                        onInputChange={onInputChange}
                                                                        name="color"
                                                                        options={languagefluency}
                                                                        menuIsOpen={menuIsOpen}
                                                                        onChange={addoptionvalue}
                                                                        placeholder={CurrentUser.languagespoken}

                                                                        value={languagefluency.filter(obj => selectedValue.includes(obj.value))}
                                                                    />
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="text-center mt-4">
                                                                    <button data-bs-toggle="modal" data-bs-target="#saveModal" onClick={handleSubmit2} className="btn btn--accent">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                    <h1>Please Access using the Mobile App </h1></Link>
            }


            <div className="modal fade" id="saveModal" tabIndex="-1" aria-labelledby="accountModal" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content border-0 bg-transparent">
                        <div className="modal-body">
                            <div className="success-message text-center">
                                <img src="assets/images/icon/arrow.png" alt="" className="icon mw-100" />
                                <p className="text">Your changes have been saved!</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >

    )
}