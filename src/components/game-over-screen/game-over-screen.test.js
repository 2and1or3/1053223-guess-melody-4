import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import GameOverScreen from './game-over-screen.jsx';

it(`Render GameOverScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <GameOverScreen onRepeat = {() => {}}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
