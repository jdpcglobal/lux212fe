import React from "react";
import ReactDom from "react-dom";
import MyApp from "./App";
import { BalanceProvider } from "./Components/SidebarComponents/BalanceContext";

ReactDom.render(
    <React.StrictMode>
        <BalanceProvider>
            <MyApp />
        </BalanceProvider>
    </React.StrictMode>,

    document.getElementById("root")
);