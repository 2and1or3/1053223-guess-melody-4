import * as React from "react";
import * as renderer from "react-test-renderer";

import QuestionGenreItem from './question-genre-item';
import {noop} from '../../utils';

it(`Render QuestionGenreItem component`, () => {
  const tree = renderer
    .create(
        <QuestionGenreItem
          genreAnswer = {`rock`}
          src = {`path`}
          id = {1}
          renderPlayer = {noop}
          userAnswer = {true}
          onChange = {noop}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
