import React from "react";
import renderer from "react-test-renderer";
import Welcome from './welcome-screen.jsx';

it(`Render Welcome component`, () => {
  const tree = renderer
      .create(<Welcome errorCount = {3} onClick = {() => {}}/>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
