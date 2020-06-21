import React from "react";
import ReactDOM from "react-dom";

import App from './components/app/app.jsx';

import {questions} from './mocks/questions.js';

const rootContainer = document.querySelector(`#root`);

const Settings = {
  ERROR_COUNT: 5,
};


ReactDOM.render(
    <App errorCount = {Settings.ERROR_COUNT} questions = {questions}/>,
    rootContainer
);
