import React from "react";
import ReactDOM from "react-dom";

import App from './components/app/app.jsx';

const rootContainer = document.querySelector(`#root`);

const ERROR_COUNT = 5;


ReactDOM.render(
    <App errorCount = {ERROR_COUNT}/>,
    rootContainer
);
