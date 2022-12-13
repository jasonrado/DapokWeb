import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const user = localStorage.getIem('user')
    if (user) {
        return true
    } else {
        return false
    }
}

const PublicRoutes = (props: any) => {
    const auth = useAuth()

    return auth ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes;