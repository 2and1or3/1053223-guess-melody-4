import React from "react";
import renderer from "react-test-renderer";

import QuestionGenreItem from './question-genre-item.jsx';

it(`Render QuestionGenreItem component`, () => {
  const tree = renderer
    .create(
        <QuestionGenreItem
          genreAnswer = {`rock`}
          src = {`path`}
          id = {1}
          renderPlayer = {() => {}}
          userAnswer = {true}
          onChange = {() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
