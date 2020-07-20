import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import WinScreen from './win-screen.jsx';

it(`Render WinScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <WinScreen onRepeat = {() => {}} quantity = {4} mistakes = {2}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
