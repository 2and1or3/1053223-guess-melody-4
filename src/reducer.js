import {questions} from './mocks/questions.js';
import {GameType} from './consts.js';


const initialState = {
  mistakes: 0,
  step: -1,
  questions,
  maxMistakes: 3,
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  REPEAT_GAME: `REPEAT_GAME`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const isCorrectGenre = (question, userAnswers) => {
  const {answers} = question;

  return answers.every((answer, i) => answer.genre === question.genre === userAnswers[i]);
};

const isCorrectArtist = (question, answer) => question.artist === answer;

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistakes: (question, answer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case GameType.GENRE:
        isAnswerCorrect = isCorrectGenre(question, answer);
        break;
      case GameType.ARTIST:
        isAnswerCorrect = isCorrectArtist(question, answer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  repeatGame: () => ({
    type: ActionType.REPEAT_GAME,
    payload: null,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const step = state.step + action.payload;

      return extend(state, {step});


    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      return extend(state, {mistakes});

    case ActionType.REPEAT_GAME:
      return extend(initialState, {step: 0});


    default:
      return state;
  }
};


export {ActionType, reducer, ActionCreator};
