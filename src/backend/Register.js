import react, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../Firebase';
import { doc, setDoc, updateDoc, getFirestore } from 'firebase/firestore/lite';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from './UseAuth';


export const useSignup = () => {
    const navigate = useNavigate();


    const [error, setError] = useState(null)
    const [error2, setError2] = useState(null)
    const [error3, setError3] = useState(null)
    const educattainment = ''
    const languagespoken = ''
    const fluency = ''
    const { dispatch } = useAuthContext()
    let [uid2, setuid] = useState('');

    const signup = ({ email, password, firstname, lastname }) => {
        setError2(null)
        const { user } = createUserWithEmailAndPassword(auth, email, password)

            .then((response) => {

                const user = response.user

                setDoc(doc(db, 'users', user.uid), {



                    firstname: firstname,
                    lastname: lastname,
                    email: user.email,
                    uid: user.uid,
                    educattainment,
                    languagespoken,
                    usertype: 'Contributor'

                })

                setuid(user.uid)
                dispatch({ payload: user })




            })
            .catch((error) => {
                console.log(error.message)
                setError(error.message)
            })
    }

    const login = ({ email, password }) => {
        setError2("")

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                const user = response.user
                console.log(user.uid)
                dispatch({ type: 'LOGIN', payload: user })


                navigate("/contributions");

            }
            )
            .catch((error2) => {
                console.log(error2.message)
                if (email == "") {
                    setError2("")
                }
                else if (password == "") {
                    setError2("")
                }
                else {
                    setError2("Incorrect Credentials")
                }

            })
    }


    const logout = () => {
        signOut(auth)
            .this((response) => {
                console.log('Successfuly Logout')
                dispatch({ type: 'LOGOUT' })
            })
            .catch((error3) => {
                console.log(error3.message)
                setError3(error3.message)
            })
    }




    return { signup, error, login, error2, logout, uid2, error3 }
}
