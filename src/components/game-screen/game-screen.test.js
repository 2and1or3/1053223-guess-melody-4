import React from "react";
import renderer from "react-test-renderer";

import GameScreen from './game-screen.jsx';
import {GameTypes} from '../../consts.js';

it(`Render GameScreen component with artist type`, () => {
  const tree = renderer
    .create(
        <GameScreen gameType = {GameTypes.ARTIST}>
          {[]}
        </GameScreen>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
