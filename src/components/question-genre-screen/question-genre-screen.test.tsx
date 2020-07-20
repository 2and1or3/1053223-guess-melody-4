import * as React from "react";
import * as renderer from "react-test-renderer";

import QuestionGenreScreen from './question-genre-screen';
import {GenreQuestion, GameType} from '../../types';
import {noop} from '../../utils';

const question: GenreQuestion = {
  type: GameType.GENRE,
  genre: `rock`,
  answers: [
    {
      genre: `rock`,
      src: `src-for-track-1`,
    },
    {
      genre: `jazz`,
      src: `src-for-track-2`,
    },
    {
      genre: `pop`,
      src: `src-for-track-3`,
    },
    {
      genre: `alternative`,
      src: `src-for-track-4`,
    }
  ]
};

it(`Render QuestionGenreScreen component`, () => {
  const tree = renderer
    .create(<QuestionGenreScreen
      question = {question}
      renderPlayer = {noop}
      userAnswers = {new Array(question.answers.length).fill(false)}
      onSubmit = {noop}
      onChange = {noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
