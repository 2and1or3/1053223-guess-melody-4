import * as React from "react";
import * as renderer from "react-test-renderer";

import {App} from './app';
import {mockAudioNode, noop} from '../../utils';
import {GenreQuestion, ArtistQuestion, GameType} from '../../types';


type Question = GenreQuestion | ArtistQuestion;

const questions: Question[] = [
  {
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
  },
  {
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
  },
];

const commonProps = {
  maxMistakes: 3,
  questions,
  mistakes: 0,
  step: -1,
  onPlayClick: noop,
  onAnswer: noop,
  onRepeat: noop,
  onAuthSubmit: noop,
  userStatus: `NO_AUTH`,
  onGoToWelcome: noop,
};

describe(`Render App component`, () => {
  it(`Render WelcomeScreen component`, () => {
    const tree = renderer
      .create(<App {...commonProps} step={-1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionGenreScreen component`, () => {
    const tree = renderer
      .create(<App {...commonProps} step={0} />, {
        createNodeMock: mockAudioNode
      }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionArtistScreen component`, () => {
    const tree = renderer
      .create(<App {...commonProps} step={1} />, {
        createNodeMock: mockAudioNode
      }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
