import React from "react";
import renderer from "react-test-renderer";
import QuestionArtistScreen from './question-artist-screen.jsx';

const question = {
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
};

it(`Render QuestionArtistScreen component`, () => {
  const tree = renderer
    .create(<QuestionArtistScreen
      question = {question}
      onAnswer = {() => {}}
      renderPlayer = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
