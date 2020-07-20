import * as React from "react";
import * as renderer from "react-test-renderer";

import QuestionArtistScreen from './question-artist-screen';
import {ArtistQuestion, GameType} from '../../types';
import {noop} from '../../utils';

const question: ArtistQuestion = {
  type: GameType.ARTIST,
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
      onAnswer = {noop}
      renderPlayer = {noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
