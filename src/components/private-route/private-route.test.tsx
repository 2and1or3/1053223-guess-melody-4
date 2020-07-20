import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import {PrivateRoute} from './private-route';

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
