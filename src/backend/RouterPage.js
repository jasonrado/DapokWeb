import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import FAQ from '../pages/FAQ'
import Contributions from "../pages/Contributions"
import Domain from "../pages/Domain"
import { useAuthContext } from "./UseAuth"
import Tests from "../pages/Tests"
import Tests2 from "../pages/Tests2"
import Repository from "../pages/Repository"
import Profile from "../pages/Profile"
import Lists from "../pages/Lists"
import PublicRoutes from "./PublicRoutes"
import ProtectedRoutes from "./ProtectedRoutes"
export default function RouterPage() {
    const { user, isAuthReady } = useAuthContext()

    return (
        <div>
            <Router>
                {isAuthReady && <Routes>
                  

                        <Route path="/contributions" element={user ? <Contributions /> : <Navigate to='/' />} />
                        <Route path="/domain" element={user ? <Domain /> : <Navigate to='/' />} />
                        <Route path="/tests" element={user ? <Tests /> : <Navigate to='/' />} />
                        <Route path="/tests2" element={user ? <Tests2 /> : <Navigate to='/' />} />
                        <Route path="/repository" element={user ? <Repository /> : <Navigate to='/' />} />
                        <Route path="/profile" element={user ? <Profile /> : <Navigate to='/' />} />
                        <Route path="/lists" element={user ? <Lists /> : <Navigate to='/' />} />
                     
                   
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />

                </Routes>}
            </Router>
        </div>

    )

}