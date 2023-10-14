import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DiamondHome from "./Components/DiamondHome";
import ReadBank from "./Components/SidebarComponents/ReadBank";
import UserProfile2 from "./Components/SidebarComponents/UserProfile2";
import "./Components/DiamondHome.css"
import SliderTabs from "./Components/SliderTabs";
import PlayGame from "./Components/PlayGame";
import TransactionsHistory from "./Components/SidebarComponents/TransactionsHistory";
import Promotion from "./Components/SidebarComponents/Promotion";
import Instruction from "./Components/SidebarComponents/Instruction";
import DownLinePlayer from "./Components/SidebarComponents/DownLinePlayer";

const RouteConfig = () => {
    return (
        <div>
            <BrowserRouter>
            <DiamondHome />
                <Routes>
                    <Route path="/" element={<SliderTabs/>} />
                    <Route path="/ReadBank" element={<ReadBank />} />
                    <Route path="/UserProfile2" element={<UserProfile2 />} />
                    <Route path="/PlayGame/:tCode/:pCode" element={<PlayGame />} />
                    <Route path="/TransactionsHistory" element={<TransactionsHistory />} />
                    <Route path="/Promotion" element={<Promotion />} />
                    <Route path="/Instruction" element={<Instruction />} />
                    <Route path="DownLinePlayer" element={<DownLinePlayer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouteConfig;
