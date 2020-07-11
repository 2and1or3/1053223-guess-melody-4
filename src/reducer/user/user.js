import {extend} from '../../utils.js';
import {URL, AuthorizationStatus} from '../../consts.js';


const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  UPDATE_AUTH_STATUS: `UPDATE_AUTH_STATUS`,
};

const ActionCreator = {
  updateAuthStatus: (status) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: status,
  }),
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {

    return api.get(URL.LOGIN)
      .then(() => dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  sendAuthRequest: (email, password) => (dispatch, getState, api) => {
    const body = {
      email,
      password,
    };

    return api.post(URL.LOGIN, body)
      .then(() => dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH)))
      .catch((err) => {
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH_STATUS:
      return extend(state, {authorizationStatus: action.payload});

    default:
      return state;
  }
};

export {Operation, reducer, ActionCreator, ActionType};
