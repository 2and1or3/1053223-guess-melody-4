import React from "react";
import renderer from "react-test-renderer";

import WinScreen from './win-screen.jsx';

it(`Render WinScreen component`, () => {
  const tree = renderer
    .create(<WinScreen onRepeat = {() => {}} quantity = {4} mistakes = {2}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
