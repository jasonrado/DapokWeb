import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../backend/UseAuth";
import { useSignup } from '../backend/Register'
import Select, { AriaOnFocus } from 'react-select';
import { getDoc, collection, doc, getFirestore, addDoc, query, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Form, Table, Button, Alert } from "react-bootstrap";
import { TestOption, testOptions, testOptions2, languagess } from "../backend/data";
import { Data } from './Dataa';
import { data } from "jquery";
export default function Repository(props) {
    const location = useLocation();

    const data2 = location.state?.data2;

    const db = getFirestore();
    const { user } = useAuthContext()
    const { logout } = useSignup()
    const LogoutFunction = (e) => {
        logout()
    }
    const [UploadExcel, setUploadExcel] = useState(false);

    const [CurrentUser, setSingledoc] = useState([]);
    const [singleDoc2, setSingledoc2] = useState([]);
    const [count, setCount] = useState([0]);
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [repoids, setrepoid] = useState('');
    const [editcontri, seteditcontri] = useState([]);
    let placedata;
    let placedata2;
    const [placeholderr, setplaceholderr] = useState([]);
    const [lastplaceholder, setlastplaceholder] = useState([]);
    const [submitchecker, setsubmitchecker] = useState('');

    const GetEditContri = (id) => {
        setSelectedRow({ id });
        setrepoid(id.id)
        console.log(id.id)

        getDoc(doc(db, "Repository", id.id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditcontri(docSnap.data());
                console.log(docSnap.data());
                placedata = docSnap.data();
            } else {
                console.log("No such document!");
            }


            if (selectedOption.value === 'Mandaya') {
                setlastplaceholder(placedata.Mandaya)
            }
            if (selectedOption.value === 'Tagalog') {
                setlastplaceholder(placedata.Tagalog)
            }
            if (selectedOption.value === 'Cebuano') {
                setlastplaceholder(placedata.Cebuano)
            }
            console.log(placedata)

            setsubmitchecker(true)
        })
    };

    const GetEditContri2 = (id) => {
        setSelectedRow({ id });

        console.log(id.id)

        getDoc(doc(db, "Repository", id.id)).then(docSnap => {
            if (docSnap.exists()) {
                seteditcontri(docSnap.data());
                console.log(docSnap.data());
                placedata = docSnap.data();
            } else {
                console.log("No such document!");
            }

            if (placedata.length !== 0) {
                if (selectedOption2.value === 'Mandaya') {
                    setlastplaceholder(placedata.Mandaya)
                }
                if (selectedOption2.value === 'Tagalog') {
                    setlastplaceholder(placedata.Tagalog)
                }
                if (selectedOption2.value === 'Cebuano') {
                    setlastplaceholder(placedata.Cebuano)
                }
                console.log(placedata2)
            }
            else {
                console.log(placedata)
            }

        })
        setsubmitchecker(false)
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

    const [newphrase, setnewphrase] = useState('');
    const SubmitEditPhrase = (e) => {
        e.preventDefault();
        const db = getFirestore();
        if (submitchecker === true) {
            if (selectedOption.value === 'Mandaya') {
                const savenewphrase = editcontri.Mandaya

                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Mandaya: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })

            };

            if (selectedOption.value === 'Tagalog') {
                const savenewphrase = editcontri.Tagalog

                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids.id);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Tagalog: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })


            };

            if (selectedOption.value === 'Cebuano') {
                const savenewphrase = editcontri.Cebuano
                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Cebuano: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })

            }

        }
        else if (submitchecker === false) {

            if (selectedOption2.value === 'Mandaya') {
                const savenewphrase = editcontri.Mandaya

                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Mandaya: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })

            };

            if (selectedOption2.value === 'Tagalog') {
                const savenewphrase = editcontri.Tagalog

                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Tagalog: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })


            };

            if (selectedOption2.value === 'Cebuano') {
                const savenewphrase = editcontri.Cebuano
                if (newphrase === '') {
                    newphrase = savenewphrase
                }
                console.log(repoids);
                const docRef = doc(db, "Repository", repoids);
                const data = {

                    Cebuano: newphrase
                }

                updateDoc(docRef, data)
                    .then(docRef => {

                    })
                    .catch(error => {
                        console.log(error);
                    })


            }


        }


    }


    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
    const onFocus: AriaOnFocus<TestOption> = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''
            }`;
        setAriaFocusMessage(msg);
        return msg;
    };
    const [selectedRow, setSelectedRow] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [dataoptions, setdataoptions] = useState([]);
    const [repositorydata, setrepositorydata] = useState([]);
    const [getdatalang, setdatalang] = useState([]);
    useEffect(() => {

        getDoc(doc(db, "users", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setSingledoc(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })
        getDoc(doc(db, "Domains", data2)).then(docSnap => {
            if (docSnap.exists()) {
                setdatalang(docSnap.data());
            } else {
                console.log("No such document!");
            }
        })


        const q = query(collection(db, 'WebLanguage'), orderBy('Staff', 'asc'));
        const getDomains = onSnapshot(
            q,
            snapshot => {
                if (!snapshot.empty) {
                    setMenuItems(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )

                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );
        const p = query(collection(db, 'Repository'));
        const getRepoData = onSnapshot(
            p,
            snapshot => {
                if (!snapshot.empty) {
                    setrepositorydata(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )

                }
                setIsLoading(false);
            },
            err => {
                setError(err.message);
                console.error(err.message);
            }
        );



        return () => {
            getDomains();
            getRepoData();

        };




    }, [])
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const getdata = (e) => {
        if (data3 === "") {
            menuItems.map(({ id, Description, Language }, index) => (
                dataoptions.push({ value: Language, label: Language, isDisabled: false })
            ))
            setData3(dataoptions)
            console.log(dataoptions)
        }
        else {

        }

    }
    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    // handle File
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/comma-separated-values', 'application/x-excel', 'application/x-msexcel'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    // submit function
    const [defaultnumber, setdefaultnumber] = useState('');
    const [lengthnumber, setlengthnumber] = useState('');
    const [columnss, setcolumns] = useState([]);
    const handleSubmit = (e) => {
        setExcelData("");

        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
            const data45 = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
            setExcelData(data45);
            setlengthnumber(data45.length);

            console.log(data45.length)
            setcolumns(data[0])
            console.log(data[0])

        }
        else {
            setExcelData(null);
        }


    }
    const [taga, settaga] = useState('')
    const [cebu, setcebu] = useState('')
    const [manda, setmanda] = useState('');
    let savemanda = ''
    let savecebu = ''
    const defaultdata = ""
    const defaultdata2 = ""
    let savetagalog = ''
    let checker = (false);
    const uploadtofirebase = (e) => {


        if ((columnss[0] === "Tagalog" || (columnss[1] === "Tagalog") || (columnss[2] === "Tagalog"))) {
            savetagalog = 'Tagalog'
        }
        if ((columnss[0] === "Cebuano" || (columnss[1] === "Cebuano") || (columnss[2] === "Cebuano"))) {
            savecebu = 'Cebuano'
        }
        if ((columnss[0] === "Mandaya" || (columnss[1] === "Mandaya") || (columnss[2] === "Mandaya"))) {

            savemanda = 'Mandaya'
        }


        if ((savetagalog === 'Tagalog') && (savecebu === 'Cebuano') && (savemanda === 'Mandaya')) {
            checker = true
            for (var i = 0; i < lengthnumber; i++) {

                addDoc(collection(db, 'Repository'), {

                    Tagalog: excelData[i].Tagalog,
                    Cebuano: excelData[i].Cebuano,
                    Mandaya: excelData[i].Mandaya,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
            }




        }
        else if ((savetagalog === 'Tagalog') && (savecebu === 'Cebuano') && (savemanda !== 'Mandaya')) {
            for (var i = 0; i < lengthnumber; i++) {



                addDoc(collection(db, 'Repository'), {
                    Tagalog: excelData[i].Tagalog,
                    Cebuano: excelData[i].Cebuano,
                    Mandaya: defaultdata,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }

                )
                checker = true
            }



        }
        else if ((savetagalog === 'Tagalog') && (savecebu !== 'Cebuano') && (savemanda === 'Mandaya')) {
            console.log(lengthnumber)
            for (var i = 0; i < lengthnumber; i++) {
                checker = true
                addDoc(collection(db, 'Repository'), {
                    Tagalog: excelData[i].Tagalog,
                    Cebuano: defaultdata,
                    Mandaya: excelData[i].Mandaya,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
                console.log(excelData[i].Tagalog)
            }



        }
        else if ((savetagalog === 'Tagalog') && (savecebu !== 'Cebuano') && (savemanda !== 'Mandaya')) {
            for (var i = 0; i <= lengthnumber; i++) {
                addDoc(collection(db, 'Repository'), {
                    Tagalog: excelData[i].Tagalog,
                    Cebuano: defaultdata,
                    Mandaya: defaultdata2,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
            }



            checker = true
        }

        else if ((savetagalog !== 'Tagalog') && (savecebu === 'Cebuano') && (savemanda !== 'Mandaya')) {
            for (var i = 0; i <= lengthnumber; i++) {
                console.log(excelData[i].Cebuano)
                addDoc(collection(db, 'Repository'), {
                    Tagalog: defaultdata,
                    Cebuano: excelData[i].Cebuano,
                    Mandaya: defaultdata2,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
                checker = true
            }



        }
        else if ((savetagalog !== 'Tagalog') && (savecebu === 'Cebuano') && (savemanda === 'Mandaya')) {
            for (var i = 0; i < lengthnumber; i++) {
                addDoc(collection(db, 'Repository'), {
                    Tagalog: defaultdata,
                    Cebuano: excelData[i].Cebuano,
                    Mandaya: excelData[i].Mandaya,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
            }



            checker = true
        }
        else if ((savetagalog !== 'Tagalog') && (savecebu !== 'Cebuano') && (savemanda == 'Mandaya')) {
            for (var i = 0; i <= lengthnumber; i++) {
                addDoc(collection(db, 'Repository'), {
                    Tagalog: defaultdata,
                    Cebuano: defaultdata2,
                    Mandaya: excelData[i].Mandaya,
                    MandayaCount: 0,
                    CebuanoCount: 0,
                    TagalogCount: 0,
                    DomainID: data2
                }
                )
            }


            checker = true
        }

        console.log(checker)
        if (checker === true) {
            alert("Data Uploaded")
        }
        checker = true

    }


    const [trydd2, settry22] = useState(null);
    const [trydd, settry] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Select Language");
    const [selectedOption2, setSelectedOption2] = useState("Select Language");
    const [data3, setData3] = useState("");

    // handle onChange event of the dropdown
    const handleChange = (e) => {
        setSelectedOption(e);
        if (e.value === selectedOption2.value) {
            setSelectedOption2("Select Language")
        }

        console.log(selectedOption.value)
        const newState = data3.map((obj) => {
            // 👇️ if id equals 2, update country property

            if (obj.value === e.value) {
                return { ...obj, isDisabled: true };
            }
            else {
                return { ...obj, isDisabled: false };
            }

            // 👇️ otherwise return object as is
            return obj;
        });

        setData3(newState);
    };
    const handleChange2 = (e) => {
        setSelectedOption2(e);

    };



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
                                        < Link to="/contributions" className="sidebar-menu-link"><img src="assets/images/icon/menu1.png" alt="icon" />
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
                                                                    <p>{CurrentUser.user}</p>
                                                                    {
                                                                        <Link to="/profile" className="mt-3 d-block fs--14px fw-semibold">Edit Profile
                                                                        </Link>
                                                                    }
                                                                    {
                                                                        <Link to="/" onClick={LogoutFunction} className="mt-1 d-block fs--14px fw-semibold text--danger">  Log Out
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
                                            {
                                                <h4 className="title"> <Link to="/domain" ><a className="back-btn p-3 lh-1"><i className="fas fa-angle-left"></i></a>
                                                    {
                                                        getdatalang.DomainSite
                                                    }
                                                </Link>
                                                </h4>
                                            }


                                        </div>
                                        <button className="btn btn--success" onClick={() => setUploadExcel(true)}>Add Repository</button>
                                    </div>
                                    <div className="card-body">

                                        <div className="tab-content">

                                            <div className="tab-pane fade show active" id="all-repo">
                                                <div className="d-flex flex-wrap justify-content-end gap-3" >
                                                    <Select
                                                        aria-labelledby="aria-label"
                                                        ariaLiveMessages={{
                                                            onFocus,
                                                        }}
                                                        inputId="aria-example-input"
                                                        name="aria-live-color"
                                                        onFocus={getdata}
                                                        onMenuClose={getdata}
                                                        placeholder={"Select Language"}
                                                        options={data3}
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                        defaultValue={"Select Language"}

                                                    />

                                                </div>
                                                <table className="table table--responsive--xl">
                                                    <thead>
                                                        <tr>
                                                            <th>Sentence</th>

                                                            <th>Edit</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Tagalog') && (Tagalog != "") && (selectedOption2 == "Select Language") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Tagalog}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Cebuano') && (Cebuano != "") && (selectedOption2 == "Select Language") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Cebuano}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Mandaya') && (Mandaya != "") && (selectedOption2 == "Select Language") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Mandaya}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Mandaya') && (Mandaya != "") && (selectedOption2.value == "Tagalog") && (Tagalog != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Mandaya}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Mandaya') && (Mandaya != "") && (selectedOption2.value == "Cebuano") && (Cebuano != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Mandaya}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Cebuano') && (Cebuano != "") && (selectedOption2.value == "Tagalog") && (Tagalog != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Cebuano}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Cebuano') && (Cebuano != "") && (selectedOption2.value == "Mandaya") && (Mandaya != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Cebuano}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}

                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Tagalog') && (Tagalog != "") && (selectedOption2.value == "Mandaya") && (Mandaya != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Tagalog}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}

                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption.value == 'Tagalog') && (Tagalog != "") && (selectedOption2.value == "Cebuano") && (Cebuano != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Tagalog}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="tab-pane fade show active" id="all-repo2">
                                                <div className="d-flex flex-wrap justify-content-end gap-3">
                                                    <Select
                                                        aria-labelledby="aria-label"
                                                        ariaLiveMessages={{
                                                            onFocus,
                                                        }}
                                                        inputId="aria-example-input"
                                                        name="aria-live-color"
                                                        onFocus={getdata}
                                                        onMenuClose={onMenuClose}
                                                        placeholder={"Select Language"}
                                                        value={selectedOption2}
                                                        options={data3}
                                                        onChange={handleChange2}
                                                        openMenuOnClick={getdata}
                                                        defaultValue={"Select Language"}
                                                        isOptionDisabled={(option) => option.isDisabled == true}

                                                    />

                                                </div>
                                                <table className="table table--responsive--xl">
                                                    <thead>

                                                        <tr>

                                                            <th>Sentence</th>

                                                            <th>Edit</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {(

                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption2.value == 'Tagalog') && (Tagalog != "") && (selectedOption.value == "Cebuano") && (Cebuano != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Tagalog}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(
                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption2.value == 'Tagalog') && (Tagalog != "") && (selectedOption.value == "Mandaya") && (Mandaya != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Tagalog}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(
                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption2.value == 'Cebuano') && (Cebuano != "") && (selectedOption.value == "Tagalog") && (Tagalog != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Cebuano}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(
                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption2.value == 'Cebuano') && (Cebuano != "") && (selectedOption.value == "Mandaya") && (Mandaya != "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Cebuano}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}
                                                        {(repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCoun, DomainID }, index) => ((selectedOption2.value === 'Mandaya') && (Mandaya !== "") && (selectedOption.value === "Tagalog") && (Tagalog !== "") && (DomainID === data2)) ? (

                                                            <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                <td data-label="Language Test">{Mandaya}</td>
                                                                <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                            </tr>
                                                        ) : (
                                                            <tr key={index}></tr>
                                                        )

                                                        ))}
                                                        {(
                                                            repositorydata.map(({ id, Cebuano, CebuanoCount, Mandaya, MandayaCount, Tagalog, TagalogCount, DomainID }, index) => ((selectedOption2.value === 'Mandaya') && (Mandaya !== "") && (selectedOption.value === "Cebuano") && (Cebuano !== "") && (DomainID === data2)) ? (

                                                                <tr key={index} className={`table-row ${selectedRow.id === id}`}>
                                                                    <td data-label="Language Test">{Mandaya}</td>
                                                                    <td data-label="Edit"><button className="btn btn--warning btn--sm btn--icon" onClick={() => GetEditContri2({ id })} data-bs-toggle="modal" data-bs-target="#EditContribution"><i className="fas fa-pen"></i></button></td>

                                                                </tr>
                                                            ) : (
                                                                <tr key={index}></tr>
                                                            )

                                                            ))}





                                                    </tbody>

                                                </table>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="EditContribution" tabIndex="-1" aria-labelledby="EditContribution" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-md">
                                <div className="modal-content border-0">
                                    <div className="modal-body">
                                        <form onSubmit={SubmitEditPhrase}>
                                            <h4 className="title mb-4 pb-lg-2">Edit Phrase</h4>

                                            <textarea name="" id="" cols="30" rows="10" className="form-control form--control" placeholder={lastplaceholder} onChange={e => setnewphrase(e.target.value)}></textarea>
                                            <div className="d-flex flex-wrap justify-content-end mt-4">
                                                <button type="submit" className="btn btn--success" data-bs-toggle="modal"
                                                    data-bs-dismiss="modal">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            }

            {
                CurrentUser.usertype === 'Contributor' &&
                <Link to="/" onClick={LogoutFunction}>
                    <h1>You are Unauthorized to use this Page </h1></Link>
            }
            {
                CurrentUser.usertype === 'Validator' &&
                <Link to="/contributions">
                    <h1>You are Unauthorized to use this Page </h1></Link>
            }




            <Modal show={UploadExcel} onShow={() => setExcelData(null)} onEscapeKeyDown={() => setUploadExcel(false)} onHide={() => setUploadExcel(false)} style={{
                top: '5%'
            }}>


                <div className="modal-content border-0" style={{
                    width: '1000px', position: 'center', left: '-50%'
                }}>
                    <div className="modal-body" >
                        <form className='form-group' autoComplete="on"
                            onSubmit={handleSubmit}>
                            <label><h5>Upload Parallel Data</h5></label>

                            <br></br>
                            <input type='file' className='form-control'
                                onChange={handleFile} required></input>
                            {excelFileError && <div className='text-danger'
                                style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                            <button type='submit' className='btn btn-success'
                                style={{ marginTop: 5 + 'px' }}>View Excel Data</button>
                            <button type='button' className='btn btn-success'
                                style={{ marginTop: '5px', marginBottom: '5px', right: '30px', position: 'absolute' }} onClick={uploadtofirebase}>Add to Repository</button>
                        </form>

                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>


                        <div className='viewer'>
                            {excelData === null && <>No file selected</>}
                            {excelData !== null && (
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead >


                                            {
                                                (columnss[0] !== "") && (columnss[1] !== "") && (columnss[2] !== "") && !(!columnss[2]) &&
                                                <tr>
                                                    <th>{columnss[0]}</th>
                                                    <th>{columnss[1]}</th>
                                                    <th>{columnss[2]}</th>
                                                </tr>
                                            }
                                            {
                                                (columnss[0] !== "") && (columnss[1] !== undefined) && (columnss[2] === undefined) &&
                                                < tr >
                                                    <th>{columnss[0]}</th>
                                                    <th>{columnss[1]}</th>
                                                </tr>
                                            }
                                            {
                                                (columnss[0] !== "") && (columnss[1] === undefined) && (columnss[2] === undefined) && <tr>
                                                    <th>{columnss[0]}</th>
                                                </tr>
                                            }

                                        </thead>
                                        <tbody style={{ textAlign: 'center' }}>
                                            {
                                                columnss[0] === 'Mandaya' && columnss[1] === 'Tagalog' && columnss[2] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Tagalog}</th>
                                                        <th>{individualExcelData.Cebuano}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Mandaya' && columnss[2] === 'Tagalog' && columnss[1] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Tagalog}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[1] === 'Mandaya' && columnss[0] === 'Tagalog' && columnss[2] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Tagalog}</th>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Cebuano}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[2] === 'Mandaya' && columnss[0] === 'Tagalog' && columnss[1] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Tagalog}</th>

                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Mandaya}</th>


                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[1] === 'Mandaya' && columnss[2] === 'Tagalog' && columnss[0] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Tagalog}</th>


                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[2] === 'Mandaya' && columnss[1] === 'Tagalog' && columnss[0] === 'Cebuano' && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Tagalog}</th>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Mandaya' && columnss[1] === 'Tagalog' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>

                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Tagalog}</th>


                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Mandaya' && columnss[1] === 'Cebuano' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Mandaya}</th>
                                                        <th>{individualExcelData.Cebuano}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Tagalog' && columnss[1] === 'Mandaya' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Tagalog}</th>
                                                        <th>{individualExcelData.Mandaya}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Tagalog' && columnss[1] === 'Cebuano' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Tagalog}</th>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Cebuano' && columnss[1] === 'Mandaya' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Mandaya}</th>



                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Cebuano' && columnss[1] === 'Tagalog' && columnss.length === 2 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Cebuano}</th>
                                                        <th>{individualExcelData.Tagalog}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Cebuano' && columnss.length === 1 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Cebuano}</th>

                                                    </tr>
                                                ))
                                            }
                                            {
                                                columnss[0] === 'Tagalog' && columnss.length === 1 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Tagalog}</th>

                                                    </tr>
                                                ))
                                            }

                                            {
                                                columnss[0] === 'Mandaya' && columnss.length === 1 && excelData.map((individualExcelData) => (
                                                    <tr key={individualExcelData.Id}>
                                                        <th>{individualExcelData.Mandaya}</th>

                                                    </tr>
                                                ))
                                            }




                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                </div>





            </Modal>

        </React.Fragment >

    )
}