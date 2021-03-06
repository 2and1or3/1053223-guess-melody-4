import {extend, adapterToLocalQuestions} from '../../utils';
import {URL} from '../../consts';


const initialState = {
  questions: [],
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return extend(state, {questions: action.payload.slice(0, 2)});

    default:
      return state;
  }
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {

    return api.get(URL.QUESTIONS)
    .then((response) => response.data)
    .then((questions) => adapterToLocalQuestions(questions))
    .then((questions) => dispatch(ActionCreator.loadQuestions(questions)))
    .catch((err) => {
      throw new Error(err);
    });
  }
};

export {reducer, Operation, ActionType};
