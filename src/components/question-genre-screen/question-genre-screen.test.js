import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreScreen from './question-genre-screen.jsx';

const question = {
  type: `genre`,
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
      onAnswer = {() => {}}
      renderPlayer = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
