import {questions} from './mocks/questions.js';
import {GameTypes} from './consts.js';


const initialState = {
  mistakes: 0,
  step: -1,
  questions,
  maxMistakes: 3,
};

const ActionTypes = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
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
    type: ActionTypes.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistakes: (question, answer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case GameTypes.GENRE:
        isAnswerCorrect = isCorrectGenre(question, answer);
        break;
      case GameTypes.ARTIST:
        isAnswerCorrect = isCorrectArtist(question, answer);
        break;
    }

    return {
      type: ActionTypes.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_STEP:
      const step = state.step + action.payload;

      if (step >= state.questions.length || state.mistakes >= state.maxMistakes) {
        return extend({}, initialState);
      }
      return extend(state, {step});


    case ActionTypes.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      return extend(state, {mistakes});


    default:
      return state;
  }
};


export {ActionTypes, reducer, ActionCreator};
