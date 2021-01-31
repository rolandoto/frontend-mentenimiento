import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Router } from "react-router-dom";
import { history, store } from "./helpers";
import { Provider } from "react-redux";
import { App } from "./App";
import "typeface-poppins";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
