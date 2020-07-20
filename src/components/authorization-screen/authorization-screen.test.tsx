import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import AuthorizationScreen from './authorization-screen.jsx';

it(`Render AuthorizationScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <AuthorizationScreen onAuthSubmit = {() => {}} onRepeat = {() => {}} userStatus = {`NO_AUTH`}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
