import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import GameOverScreen from './game-over-screen';
import {noop} from '../../utils';

it(`Render GameOverScreen component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <GameOverScreen onRepeat = {noop}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
