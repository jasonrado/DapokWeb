import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../Firebase";




export const AuthContext = createContext()


const userReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'IS_AUTH_READY':

            return { ...state, user: action.payload, isAuthReady: true }
        default:
            return state
    }
}


export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, { user: null, isAuthReady: false })

    console.log('Auth state is', state)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'IS_AUTH_READY', payload: user })
            unsub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}