import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import {PrivateRoute} from './private-route.jsx';

it(`Render PrivateRoute component`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <PrivateRoute exact path = {`/path`} userStatus = {`AUTH`} render = {() => <div/>}/>
      </BrowserRouter>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
