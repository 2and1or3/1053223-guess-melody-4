import * as React from "react";
import * as renderer from "react-test-renderer";

import Mistakes from './mistakes';


it(`Render Mistakes component`, () => {
  const tree = renderer
    .create(<Mistakes maxMistakes = {3} mistakes = {1} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
