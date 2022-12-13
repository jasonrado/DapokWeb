import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSignup } from '../backend/Register'
import { useAuthContext } from '../backend/UseAuth'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Modal } from 'react-bootstrap';
import { colourOptions } from '../backend/data'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import Select, { InputActionMeta } from 'react-select';
import { LanguageFluency, languagefluency, educAttainment } from '../backend/data'
export default function Home() {



    const navigate = useNavigate();

    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [signupmodal, setsignupmodal] = useState(false);
    const [LoginModal, setLoginModal] = useState(false);
    const [forgotpassword, setforgotpassword] = useState(false);
    const [isModalThreeOpen, setIsModalThreeOpen] = useState(false);


    const db = getFirestore();

    const { user, isAuthReady } = useAuthContext()
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [educ, setEduc] = useState('');
    const [fluency2, setFluency] = useState('');
    const [language, setLanguage] = useState('');



    const [validationError, setValidationError] = useState(null)
    const [validationError2, setValidationError2] = useState(null)
    const [validationError3, setValidationError3] = useState(null)

    const { signup, error, uid2 } = useSignup()
    const { login, error2 } = useSignup()
    const SignUpFunction = (e) => {
        e.preventDefault();

        if (!firstname || !lastname) {
            setValidationError('Name cannot be empty')

            return
        }

        else if (!email) {
            setValidationError('Email cannot be empty')

            return
        }
        else if (!password) {
            setValidationError('Password cannot be empty')

            return
        }


        setValidationError(null)
        console.log({ email, password, firstname, lastname })
        signup({ email, password, firstname, lastname })
        setsignupmodal(false)
        setIsModalTwoOpen(true)

    }
    const LoginFunction = (e) => {
        e.preventDefault()
        setValidationError2(null)

        login({ email, password })

        if (!email) {
            setValidationError2('Email cannot be empty')

            return
        }
        else if (!password) {
            setValidationError2('Password cannot be empty')

            return
        }


        setValidationError2("")
        console.log({ email, password })
        login({ email, password })

    }


    const [selected, setSelected] = useState("");


    const handleChange = (e) => {
        setSelected(e.value)

    };
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

    const AddNewUserData = (e) => {
        e.preventDefault();
        const length = selectedValue.length;
        for (let i = 0; i < length; i++) {
            valuuue = valuuue + "" + selectedValue[i] + ", "
            console.log(selectedValue[i])
        }
        console.log(valuuue)

        console.log(uid2)
        const docRef = doc(db, "users", uid2);

        const data = {
            educattainment: selected,
            languagespoken: valuuue
        };

        updateDoc(docRef, data)
            .then(docRef => {
                console.log("A New Document Field has been added to an existing document");
                setIsModalTwoOpen(false)
                setIsModalThreeOpen(true)

            })
            .catch(error => {
                console.log(error);
            })




    }
    const showsignupmodal = (e) => {
        setValidationError("")



        setEmail("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setsignupmodal(true)
        setLoginModal(false)


    }
    const showloginmodal = (e) => {

        setValidationError2("")
        setEmail("")
        setPassword("")
        login({ email, password })


        setsignupmodal(false)
        setIsModalTwoOpen(false)
        setLoginModal(true)
    }
    const closeloginmodal = (e) => {
        setLoginModal(false)
        setValidationError2("")
        setEmail("")
        setPassword("")

        login({ email, password })

    }
    const closesignupmodal = (e) => {
        setValidationError("")

        setEmail("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setsignupmodal(false)
    }
    const showforgotpassword = (e) => {
        setValidationError3("")
        e.preventDefault()
        setEmail("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setsignupmodal(false)
        setLoginModal(false)
        setforgotpassword(true)
    }
    const closeforgotpassword = (e) => {
        setValidationError3("")
        e.preventDefault()
        setEmail("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setsignupmodal(false)
        setLoginModal(false)
        setforgotpassword(false)
    }

    const forgotpasswordfunction = (e) => {
        e.preventDefault()
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setValidationError3("Email sent, please check your Email")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setValidationError3("Invalid Email")
            });
    }
    const handleClick = (e) => {


        window.location.reload(false);


    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);




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


    return (





        <React.Fragment>

            <div className="overlay"></div>



            <div className="body-wrapper bg--accent min-vh-100 overflow-hidden d-flex align-items-center  position-relative" id="mainbody">

                <div className="header">
                    <div className="header-bottom">
                        <div className="header-bottom-area align-items-center">
                            <div className="logo"><Link to="/"><img src="assets/images/logo.png" alt="logo" /></Link></div>
                            <ul className="menu">
                                <li>{
                                    <Link to="/">Home</Link>
                                }

                                </li>
                                <li>

                                    <Link to="/about">About</Link>


                                </li>
                                <li>

                                    <Link to="/faq">FAQ</Link>


                                </li>
                            </ul>
                            <div className="header-trigger-wrapper d-flex d-lg-none align-items-center">
                                <div className="header-trigger">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-wrapper-inner d-flex flex-wrap pe-lg-0">
                    <div className="body-wrapper-inner__left position-relative pt-80">
                        <h5 style={{
                            fontFamily: 'ahsing',
                            fontSize: '80px',
                            margin: '0',
                            fontWeight: '700',
                            lineHeight: '1.3'
                        }}
                            className="title text--warning mb-4 pb-2" >DAPOK</h5>
                        <p className="mb-4 pb-3" style={{
                            fontFamily: 'Inter',
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <div className="d-flex flex-wrap gap-3 gap-sm-4">
                            {
                                user &&
                                <Link to="/contributions" > <button className="btn btn--outline-accent" > View Dapok
                                </button>  </Link>
                            }
                            {
                                !user && <button className="btn btn--outline-accent" onClick={showloginmodal}>Sign In</button>
                            }
                            {
                                !user && <button className="btn btn--accent" onClick={showsignupmodal}>Create Account</button>
                            }

                        </div>


                        <ul className="social-links d-flex flex-wrap pt-100 gap-3">
                            <li><a href="#!"><img className="mw-100" src="assets/images/icon/facebook.png" alt="icon" /></a></li>
                            <li><a href="#!"><img className="mw-100" src="assets/images/icon/twitter.png" alt="icon" /></a></li>
                            <li><a href="#!"><img className="mw-100" src="assets/images/icon/instagram.png" alt="icon" /></a></li>
                            <li><a href="#!"><img className="mw-100" src="assets/images/icon/gmail.png" alt="icon" /></a></li>
                        </ul>
                    </div>
                    <div className="body-wrapper-inner__right text-end align-self-end">
                        <img src="assets/images/thumb/home.png" alt="thumb" className="mw-100" />
                    </div>
                </div>
            </div>


            <Modal show={LoginModal} onEscapeKeyDown={closeloginmodal} onHide={closeloginmodal} fade="false" animation="false" style={{
                top: '10%'
            }} >

                <div className="modal-dialog-centered modal-xl" style={{
                    position: 'relative', left: '-50%'
                }}>
                    <div className="modal-content border-0" style={{
                        width: '1000px', position: 'absolute', top: '100%',
                    }}>
                        <div className="account-wrapper d-flex">
                            <div className="account-wrapper__left bg--accent">
                                <img src="assets/images/thumb/login.png" alt="thumb" className="mw-100" />
                            </div>
                            <div className="account-wrapper__right">
                                <form onSubmit={LoginFunction}>
                                    <div className="form-group mb-3 mb-xl-4">
                                        <label className="form-label" htmlFor="">Email</label>
                                        <input type="text" id='email' className="form-control form--control" onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 mb-xl-4">
                                        <label className="form-label" htmlFor="">Password</label>
                                        <input type="password" id='password' className="form-control form--control" onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="d-flex flex-wrap gap-2 justify-content-between">
                                        <div className="form-group custom--checkbox">
                                        </div>
                                        <label className="text--base" onClick={showforgotpassword}>Forgot Password?</label>
                                    </div>
                                    <div>
                                        {
                                            validationError2 && <div className="text-center mt-3 mt-sm-4" >
                                                {validationError2}
                                            </div>
                                        }
                                        {
                                            error2 && <div className="text-center mt-3 mt-sm-4" >
                                                {error2}
                                            </div>
                                        }

                                    </div>
                                    <div className="text-center mt-4 mt-xl-5">

                                        <button type="submit" className="btn btn--accent" >Sign in</button>


                                    </div>
                                    <p className="text-center mt-4 mt-xl-5 mb-0">Don’t have an account?
                                        <button type="submit"
                                            className="text--base fw-bold bg-transparent border-0" onClick={showsignupmodal} >Sign Up.</button></p>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>

            <Modal show={forgotpassword} onEscapeKeyDown={closeforgotpassword} onHide={() => setforgotpassword(false)} fade="false" animation="false" style={{
                top: '10%'
            }} >

                <div className="modal-dialog-centered modal-xl" style={{
                    position: 'relative', left: '-50%'
                }}>
                    <div className="modal-content border-0" style={{
                        width: '1000px', position: 'absolute', top: '100%',
                    }}>
                        <div className="account-wrapper d-flex">
                            <div className="account-wrapper__left bg--accent">
                                <img src="assets/images/thumb/login.png" alt="thumb" className="mw-100" />
                            </div>
                            <div className="account-wrapper__right">
                                <form onSubmit={forgotpasswordfunction}>
                                    <div className="form-group mb-3 mb-xl-4">
                                        <label className="form-label" htmlFor="">Enter Your Email Address:</label>
                                        <input type="text" id='email' className="form-control form--control" onChange={e => setEmail(e.target.value)} />
                                    </div>

                                    <div>
                                        {
                                            validationError3 && <div className="text-center mt-3 mt-sm-4" >
                                                {validationError3}
                                            </div>
                                        }

                                    </div>
                                    <div className="text-center mt-4 mt-xl-5">

                                        <button type="submit" className="btn btn--accent" >Reset Password</button>


                                    </div>
                                    <p className="text-center mt-4 mt-xl-5 mb-0">Don’t have an account?
                                        <button type="submit"
                                            className="text--base fw-bold bg-transparent border-0" onClick={showsignupmodal} >Sign Up.</button></p>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
            <Modal show={signupmodal} onEscapeKeyDown={closesignupmodal} onHide={closesignupmodal} fade="false" animation="false" style={{
                top: '10%'
            }} >
                <div className="modal-dialog-centered modal-xl " style={{
                    width: '1196px', position: 'absolute', left: '-75%'
                }}>
                    <div className="modal-content" style={{
                        width: '1196px', position: 'absolute', top: '100%',
                    }}>
                        <div className="modal-body p-0 ">
                            <div className="account-wrapper d-flex">
                                <div className="account-wrapper__left">
                                    <div className="login-thumb">
                                        <img src="assets/images/thumb/sign-up.png" alt="thumb" />
                                        <div className="thumb-content">
                                            <h2 className="title mb-1 text-white">Create an Account</h2>
                                            <p className="pb-40 text-white">Please enter your details to sign up and be part of our community</p>
                                            <p className="text-white">Already have an account? <button type="button" onClick={showloginmodal} className="text--base fw-bold border-0 bg-transparent">Sign In</button></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="account-wrapper__right">
                                    <form onSubmit={SignUpFunction}>
                                        <div className="tab">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" >First Name</label>
                                                        <input type="text" className="form-control form--control" onChange={e => setFirstname(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control form--control" onChange={e => setLastname(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" >Email</label>
                                                        <input type="email" className="form-control form--control" id='email' onChange={e => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label" >Password</label>
                                                        <input type="password" className="form-control form--control" id='password' onChange={e => setPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        validationError && <div className="text-center mt-3 mt-sm-4" >
                                                            {validationError}
                                                        </div>
                                                    }
                                                    {
                                                        error && <div className="text-center mt-3 mt-sm-4" >
                                                            {error}
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-12">
                                                    <div className="text-center mt-3 mt-sm-4">
                                                        <button type='submit' id="xd" className="btn btn--accent"
                                                        >Sign Up</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </Modal>






            <Modal show={isModalTwoOpen} fade="false" animation="false" style={{
                top: '10%'
            }} onClose={() => isModalTwoOpen(false)}>

                <div className="modal-dialog-centered modal-xl " style={{
                    width: '1196px',
                    position: 'absolute',
                    left: '-75%',

                }}>
                    <div className="modal-content" >
                        <div className="modal-content border-0">
                            <div className="modal-body p-0 ">
                                <div className="account-wrapper d-flex">
                                    <div className="account-wrapper__left">
                                        <div className="login-thumb">
                                            <img src="assets/images/thumb/sign-up.png" alt="thumb" />
                                            <div className="thumb-content">
                                                <h2 className="title mb-1 text-white">Finish Creating Your Account</h2>
                                                <p className="pb-40 text-white">Please enter your additional details to finalize your Registration and be part of our Community</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-wrapper__right">
                                        <form onSubmit={AddNewUserData}>
                                            <div className="tab">
                                                <div className="form-header text-center">
                                                    <h4 className="title">Additional Information</h4>
                                                    <p className="mb-4">Please fill up the details to continue</p>
                                                </div>
                                                <div className="form-group mb-5">
                                                    <label className="form-label">Highest Educational Attainment</label>
                                                    <Select


                                                        inputId="aria-example-input"
                                                        name="aria-live-color"

                                                        options={educAttainment}

                                                        onChange={handleChange}

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

                                                        value={languagefluency.filter(obj => selectedValue.includes(obj.value))}
                                                    />
                                                </div>
                                                <div className="text-center mt-5 pt-4">
                                                    <button type="submit" className="btn btn--accent">Sign Up</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
            <Modal show={isModalThreeOpen} onHide={handleClick}>

                <div onClick={handleClick}>
                    <div className="modal-dialog modal-dialog-centered modal-sm" style={{
                        position: 'absolute',
                        display: 'flex',
                        width: '100%',
                        color: 'var(--bs-modal-color)',
                        pointerEvents: 'auto',
                        backgroundColor: '#3b252500',
                        backgroudClip: 'padding-box',
                        borderRadius: 'var(--bs-modal-border-radius)',
                        outline: '0'
                    }}>
                        <div className="modal-content border-0 bg-transparent">
                            <div className="modal-body">
                                <div className="success-message text-center">
                                    <img src="assets/images/icon/arrow.png" alt="" className="icon mw-100" />
                                    <p className="text">Your account have been created successfully!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>




















            <script src="assets/js/lib/jquery-3.6.0.min.js"></script>
            <script src="assets/js/lib/bootstrap.min.js"></script>
            <script src="assets/js/main.js"></script>
        </React.Fragment >

    )
}



