import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import WinScreen from './win-screen';
import {noop} from '../../utils';

it(`Render WinScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <WinScreen onRepeat = {noop} quantity = {4} mistakes = {2}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
