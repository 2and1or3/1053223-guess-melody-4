import MockAdapter from "axios-mock-adapter";

import {reducer, ActionType, Operation} from './data';
import createApi from '../../api';


const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        genre: `rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      {
        genre: `jazz`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      {
        genre: `pop`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      {
        genre: `alternative`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      }
    ]
  },
  {
    type: `artist`,
    artist: `true-person`,
    trackSrc: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
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

const api = createApi();

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    expect(
        reducer(void 0, {})
    ).toEqual({
      questions: [],
    });
  });


  it(`Reducer should update state with new questions`, () => {
    const stateBefore = {
      questions: [],
    };
    const action = {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
    const stateAfter = {
      questions,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

describe(`Operation work correctly`, () => {
  it(`loadQuestions should load questions from /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
    .onGet(`/questions`)
    .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.LOAD_QUESTIONS,
        payload: [{fake: true}],
      });
    });
  });

});
