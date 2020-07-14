import {GameType} from '../../consts.js';
import {extend} from '../../utils.js';


const initialState = {
  mistakes: 0,
  step: -1,
  maxMistakes: 3,
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  REPEAT_GAME: `REPEAT_GAME`,
  GO_TO_WELCOME: `GO_TO_WELCOME`,
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

  toWelcome: () => ({
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })
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

    case ActionType.GO_TO_WELCOME:
      return extend(initialState, {step: -1});

    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
