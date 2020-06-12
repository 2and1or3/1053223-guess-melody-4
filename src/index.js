import React from "react";
import ReactDOM from "react-dom";

import App from './components/app/app.jsx';

const rootContainer = document.querySelector(`#root`);

const ErrorCount = 5;


ReactDOM.render(
    <App errorCount = {ErrorCount}/>,
    rootContainer
);
