import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuthContext = () => {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('AuthContext is undefined')
    }

    return authContext
}