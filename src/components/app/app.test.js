import React from "react";
import renderer from "react-test-renderer";
import App from './app.jsx';

const questions = [
  {
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
  },
  {
    type: `artist`,
    artist: `true-person`,
    trackSrc: `src-for-track`,
    answers: [
      {
        artist: `true-person`,
        pictureSrc: `http://placehold.it/134x134`,
      },
      {
        artist: `person-2`,
        pictureSrc: `http://placehold.it/134x134`,
      },
      {
        artist: `person-3`,
        pictureSrc: `http://placehold.it/134x134`,
      },
    ]
  },
];

it(`Render App component`, () => {
  const tree = renderer
      .create(<App errorCount = {3} questions = {questions}/>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});