import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app.jsx';

import createApi from './api.js';

import {reducer} from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';


const rootContainer = document.querySelector(`#root`);

const needDispatchFunc = () => {};

const api = createApi(needDispatchFunc);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadQuestions());


ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>
    ,
    rootContainer
);
