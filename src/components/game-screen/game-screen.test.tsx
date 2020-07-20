import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import GameScreen from './game-screen';
import {GameType} from '../../types';
import {noop} from '../../utils';

it(`Render GameScreen component with artist type`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <GameScreen gameType = {GameType.ARTIST} maxMistakes = {3} mistakes = {0} onGoToWelcome = {noop}>
            {[]}
          </GameScreen>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
