import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./UseAuth";
import React from "react";



const useAuth = () => {
    const user = localStorage.getItem('User')
    if (user) {
        return {
            auth: true,
            role: user.role
        }
    }
    else {
        return {
            auth: false,
            roll: null
        }
    }
}

type ProtectedRouteType = {
    roleRequired?: 'Admin' | 'Validator'
}



const ProtectedRoutes = (props: ProtectedRouteType) => {

    const { auth, role } = useAuth()


    if (props.roleRequired) {
        return auth ? (
            props.roleRequired === role ? (
                <Outlet />
            ) : (
                <Navigate to="/contributions" />
            )
        ) : (
            <Navigate to="/contributions" />
        )
    }
    else {
        return auth ? <Outlet /> : <Navigate to="/contributions" />
    }

}

export default ProtectedRoutes;