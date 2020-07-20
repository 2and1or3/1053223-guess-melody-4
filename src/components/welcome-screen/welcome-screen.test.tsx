import * as React from "react";
import * as renderer from "react-test-renderer";

import Welcome from './welcome-screen';
import {noop} from '../../utils';

it(`Render Welcome component`, () => {
  const tree = renderer
      .create(<Welcome errorCount = {3} onPlayClick = {noop}/>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
