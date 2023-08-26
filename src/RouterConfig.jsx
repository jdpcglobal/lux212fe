import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DiamondHome from "./Components/DiamondHome";
import Sidebar from "./Components/Sidebar";
import ReadBank from "./Components/SidebarComponents/ReadBank";
import UserProfile from "./Components/SidebarComponents/UserProfile";
import "./Components/DiamondHome.css"

const RouteConfig = () => {
    return (
        <div>
            <BrowserRouter>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<DiamondHome />} />
                    <Route path="/bank" element={<ReadBank />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteConfig;
