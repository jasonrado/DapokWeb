import React from "react";
import { Link } from "react-router-dom";

type Props = {
    roleRequired: 'Admin' | 'Validator' | 'User',
    message: string,
    children?: React.ReactNode;
}

const useRole = () => {

    let user: AnalyserNode
    const _user = localStorage.getItem("user")

    if (_user) {
        user = JSON.parse(_user)
    }
    if (user) {
        return user.role
    } else {
        return 'User'
    }
}

const WithPermission = (props: Props) => {
    const { roleRequired, message, children } = props
    const role = useRole()
    return (
        <>
            {
                roleRequired === role ? children : <h3>{message ? message : ''}</h3>
            }
        </>
    )
}

export default WithPermission;