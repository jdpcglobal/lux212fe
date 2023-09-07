import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DiamondHome from "./Components/DiamondHome";
import ReadBank from "./Components/SidebarComponents/ReadBank";
import UserProfile2 from "./Components/SidebarComponents/UserProfile2";
import "./Components/DiamondHome.css"
import SliderTabs from "./Components/SliderTabs";

const RouteConfig = () => {
    return (
        <div>
            <BrowserRouter>
            <DiamondHome />
                <Routes>
                    <Route path="/" element={<SliderTabs/>} />
                    <Route path="/ReadBank" element={<ReadBank />} />
                    <Route path="/UserProfile2" element={<UserProfile2 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteConfig;
