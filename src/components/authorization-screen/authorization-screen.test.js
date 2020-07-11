import React from "react";
import renderer from "react-test-renderer";

import AuthorizationScreen from './authorization-screen.jsx';

it(`Render AuthorizationScreen component`, () => {
  const tree = renderer
    .create(<AuthorizationScreen onAuthSubmit = {() => {}} onRepeat = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
