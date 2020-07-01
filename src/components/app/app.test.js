import React from "react";
import renderer from "react-test-renderer";

import {App} from './app.jsx';


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

describe(`Render App component`, () => {
  it(`Render WelcomeScreen component`, () => {
    const tree = renderer
      .create(
          <App
            maxMistakes = {3}
            questions = {questions}
            mistakes = {0}
            step = {-1}
            onPlayClick = {() => {}}
            onAnswer = {() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionGenreScreen component`, () => {
    const tree = renderer
    .create(
        <App
          maxMistakes = {3}
          questions = {questions}
          mistakes = {1}
          step = {0}
          onPlayClick = {() => {}}
          onAnswer = {() => {}}
        />, {
          createNodeMock: (element) => {
            if (element.type === `audio`) {
              return element;
            }

            return null;
          }
        }
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render QuestionArtistScreen component`, () => {
    const tree = renderer
    .create(
        <App
          maxMistakes = {3}
          questions = {questions}
          mistakes = {1}
          step = {1}
          onPlayClick = {() => {}}
          onAnswer = {() => {}}
        />, {
          createNodeMock: (element) => {
            if (element.type === `audio`) {
              return element;
            }

            return null;
          }
        }
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
