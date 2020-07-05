import React from "react";
import renderer from "react-test-renderer";

import {App} from './app.jsx';
import {mockAudioNode} from '../../utils.js';


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

const commonProps = {
  maxMistakes: 3,
  questions,
  mistakes: 0,
  step: -1,
  onPlayClick: () => {},
  onAnswer: () => {},
  onRepeat: () => {},
};

describe(`Render App component`, () => {
  it(`Render WelcomeScreen component`, () => {
    const tree = renderer
      .create(
          <App
            {...commonProps}
            step = {-1}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionGenreScreen component`, () => {
    const tree = renderer
    .create(
        <App
          {...commonProps}
          step = {0}
        />, {
          createNodeMock: mockAudioNode
        }
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionArtistScreen component`, () => {
    const tree = renderer
    .create(
        <App
          {...commonProps}
          step = {1}
        />, {
          createNodeMock: mockAudioNode
        }
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
