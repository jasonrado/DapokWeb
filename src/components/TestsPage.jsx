import React, { CSSProperties, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Select, { AriaOnFocus } from 'react-select';
import { useAuthContext } from "../backend/UseAuth";
import { useSignup } from '../backend/Register'
import { getDoc, collection, doc, getFirestore, query, onSnapshot, orderBy, addDoc, arrayUnion, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import { TestOption, testOptions, testOptions2 } from "../backend/data";
export const TestsTable = ({ MenuItems }) => {
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

    const [singleDoc, setSingledoc] = useState([]);
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

    return (




        <table className="table table--responsive--xl">
            <thead>
                <tr>
                    <th>Language (Test)</th>
                    <th>Language (Answer)</th>
                    <th>Author</th>
                    <th>View Questions</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(
                    MenuItems.map(({ id, Author, languageanswer, languagetest }, index) => (

                        <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                            <td data-label="Language Test">{languagetest}</td>
                            <td data-label="Language Answer">{languageanswer}</td>
                            <td data-label="Author">{Author}</td>
                            <td data-label="View Questions">
                                {
                                    <Link to="/tests2" state={{ data: id }} className="btn btn--primary btn--icon"><i className="fas fa-search"></i>
                                    </Link>
                                }
                            </td>

                            <td data-label="Delete"><button className="btn btn--danger btn--icon remove-item"><i className="fas fa-trash"></i></button></td>
                        </tr>
                    )

                    ))}

            </tbody>
        </table>
    )
}
export const TestQuestionnaireTable = ({ MenuItems }) => {
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



    const [singleDoc, setSingledoc] = useState([]);
    const [singleDoc2, setSingledoc2] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [validationError2, setValidationError2] = useState(null);
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

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
        if (EditQuestion.answer === opt.options[0]) {
            setcorrectoption("Option 1")
        }
        if (EditQuestion.answer === opt.options[1]) {
            setcorrectoption("Option 2")
        }
        if (EditQuestion.answer === opt.options[2]) {
            setcorrectoption("Option 3")
        }
        if (EditQuestion.answer === opt.options[3]) {
            setcorrectoption("Option 4")
        }
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
    const deletedata = (id) => {
        setSelectedRow({ id });
        deleteDoc(doc(db, "testquestions", id));
    }
    const [opt, setopt] = useState({ options: "United States", });
    const [EditQuestion, setEditQuestion] = useState('')
    const [correctoption, setcorrectoption] = useState('')
    const [testID2, settestID] = useState('');
    const GetTestID = (id) => {
        setSelectedRow({ id });
        settestID(id);
        const db = getFirestore();
        getDoc(doc(db, "testquestions", id)).then(docSnap => {
            if (docSnap.exists()) {

                setEditQuestion(docSnap.data());
                let e = docSnap.data()
                setopt((prev) => ({
                    ...prev,
                    options: e.options
                }))
                if (EditQuestion.answer === opt.options[0]) {
                    setcorrectoption("Option 1")
                }
                if (EditQuestion.answer === opt.options[1]) {
                    setcorrectoption("Option 2")
                }
                if (EditQuestion.answer === opt.options[2]) {
                    setcorrectoption("Option 3")
                }
                if (EditQuestion.answer === opt.options[3]) {
                    setcorrectoption("Option 4")
                }
                setcount(count + 1)


            } else {
                console.log("No such document!");
            }
        })


        if (EditQuestion.answer === opt.options[0]) {
            setcorrectoption("Option 1")
        }
        if (EditQuestion.answer === opt.options[1]) {
            setcorrectoption("Option 2")
        }
        if (EditQuestion.answer === opt.options[2]) {
            setcorrectoption("Option 3")
        }
        if (EditQuestion.answer === opt.options[3]) {
            setcorrectoption("Option 4")
        }


    };




    const SubmitEditTest = (e) => {
        e.preventDefault();
        const db = getFirestore();

        const newquestion = EditQuestion.question
        const newoption1 = opt.options[0]
        const newoption2 = opt.options[1]
        const newoption3 = opt.options[2]
        const newoption4 = opt.options[3]
        const newanswer = EditQuestion.answer
        if (editquestion2 === '') {
            editquestion2 = newquestion
        }
        if (editoption1 === '') {
            editoption1 = newoption1
        }
        if (editoption2 === '') {
            editoption2 = newoption2
        }
        if (editoption3 === '') {
            editoption3 = newoption3
        }
        if (editoption4 === '') {
            editoption4 = newoption4
        }
        if (editanswer === '') {
            editanswer = newanswer
        }

        const docRef = doc(db, "testquestions", testID2);
        const data = {
            answer: editanswer,
            correct_option: editanswer,
            question: editquestion2
        }

        updateDoc(docRef, data)
            .then(docRef => {
                console.log("Update successful")
            })
            .catch(error => {
                console.log(error);

            })

        updateDoc(docRef, {
            options: arrayRemove(opt.options[0], opt.options[1], opt.options[2], opt.options[3])
        });
        updateDoc(docRef, {
            options: arrayUnion(editoption1, editoption2, editoption3, editoption4)
        });



    };
    const handleChange2 = (options) => {

        const newquestion = EditQuestion.question
        const newoption1 = opt.options[0]
        const newoption2 = opt.options[1]
        const newoption3 = opt.options[2]
        const newoption4 = opt.options[3]
        const newanswer = EditQuestion.answer
        if (editquestion2 === '') {
            editquestion2 = newquestion
        }
        if (editoption1 === '') {
            editoption1 = newoption1
        }
        if (editoption2 === '') {
            editoption2 = newoption2
        }
        if (editoption3 === '') {
            editoption3 = newoption3
        }
        if (editoption4 === '') {
            editoption4 = newoption4
        }
        if (editanswer === '') {
            editanswer = newanswer
        }

        if (options.value === "Option1") {
            setcorrectoption("Option 1")
            seteditanswer(editoption1)

        }
        if (options.value === "Option2") {

            setcorrectoption("Option 2")
            seteditanswer(editoption2)
        }
        if (options.value === "Option3") {

            setcorrectoption("Option 3")
            seteditanswer(editoption3)
        }
        if (options.value === "Option4") {

            setcorrectoption("Option 4")
            seteditanswer(editoption4)
        }
        console.log(options.value)
        console.log(editanswer)

    };
    return (




        <table className="table table--responsive--xl">
            <thead>
                <tr>

                    <th>Question</th>
                    <th>Option 1</th>
                    <th>Option 2</th>
                    <th>Option3</th>
                    <th>Option4</th>
                    <th>Answer</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>

                {(
                    MenuItems.map(({ id, answer, correctoption, options, original_language, question, translated_language, testid }, index) => testid === data ? (


                        <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                            <td data-label="question">{question}</td>
                            <td data-label="options1">{options[0]}</td>
                            <td data-label="options2">{options[1]}</td>
                            <td data-label="options3">{options[2]}</td>
                            <td data-label="options4">{options[3]}</td>
                            <td data-label="answer">{answer}</td>
                            <td data-label="Edit"><button className="btn btn--warning btn--icon" data-bs-toggle="modal" data-bs-target="#editQuestionModal" onClick={() => GetTestID(id)}><i className="fas fa-pen"></i></button></td>
                            <td data-label="Delete"><button className="btn btn--danger btn--icon remove-item" onClick={() => deletedata(id)}><i className="fas fa-trash"></i></button></td>
                        </tr>
                    ) : (
                        <tr></tr>

                    )

                    ))}
                <div className="modal fade" id="editQuestionModal" tabIndex="-1" aria-labelledby="editQuestionModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content border-0">
                            <div className="modal-body">
                                <form onSubmit={SubmitEditTest}>
                                    <h4 className="title mb-4 pb-lg-2">Edit Test Question</h4>
                                    <div className="row gy-3 gx-xl-5">
                                        <div className="col-12">
                                            <textarea name="" id="" cols="30" rows="10" className="form-control form--control" onChange={e => seteditquestion(e.target.value)} placeholder={EditQuestion.question}></textarea>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row gy-3 gx-3 gx-xl-5">
                                                <div className="col-12">
                                                    <input type="text" className="form-control form--control" onChange={e => seteditoption1(e.target.value)} placeholder={opt.options[0]} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row gy-3 gx-3 gx-xl-5">
                                                <div className="col-12">
                                                    <input type="text" className="form-control form--control" onChange={e => seteditoption2(e.target.value)} placeholder={opt.options[1]} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row gy-3 gx-3 gx-xl-5">
                                                <div className="col-12">
                                                    <input type="text" className="form-control form--control" onChange={e => seteditoption3(e.target.value)} placeholder={opt.options[2]} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row gy-3 gx-3 gx-xl-5">
                                                <div className="col-12">
                                                    <input type="text" className="form-control form--control" onChange={e => seteditoption4(e.target.value)} placeholder={opt.options[3]} />
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
                                                placeholder={correctoption}
                                                options={testOptions2}
                                                onChange={handleChange2}
                                            />


                                            <button type="submit" className="btn btn--accent" data-bs-toggle="modal" data-bs-dismiss="modal">Submit</button>



                                        </div>
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

