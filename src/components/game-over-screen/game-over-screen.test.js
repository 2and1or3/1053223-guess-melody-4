import React from "react";
import renderer from "react-test-renderer";

import GameOverScreen from './game-over-screen.jsx';

it(`Render GameOverScreen component`, () => {
  const tree = renderer
    .create(<GameOverScreen onRepeat = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
