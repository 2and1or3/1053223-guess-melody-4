import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import AuthorizationScreen from './authorization-screen';
import {noop} from '../../utils';

it(`Render AuthorizationScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <AuthorizationScreen onAuthSubmit = {noop} onRepeat = {noop} userStatus = {`NO_AUTH`}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
