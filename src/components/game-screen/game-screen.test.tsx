import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import GameScreen from './game-screen.jsx';
import {GameType} from '../../types.ts';

it(`Render GameScreen component with artist type`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <GameScreen gameType = {GameType.ARTIST} maxMistakes = {3} mistakes = {0} onGoToWelcome = {() => {}}>
            {[]}
          </GameScreen>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
