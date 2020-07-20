import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app';

import createApi from './api';

import {reducer} from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation, ActionCreator} from './reducer/user/user';
import {AuthorizationStatus} from './consts';


const rootContainer = document.querySelector(`#root`);

const onUnauthorized = () => {
  store.dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuthStatus());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    rootContainer
);
