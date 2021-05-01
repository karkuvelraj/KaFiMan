import React from "react";
import reactDom from "react-dom"
import App from "./App"
import {CookiesProvider} from "react-cookie"
import registerServiceWorker from './registerServiceWorker';
reactDom.render(
    <CookiesProvider >
    <App/>
    </CookiesProvider>,

    document.getElementById("root")
    )
    registerServiceWorker()