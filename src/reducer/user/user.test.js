import MockAdapter from "axios-mock-adapter";

import createApi from '../../api.js';
import {reducer, ActionType, Operation} from './user.js';

const api = createApi(() => {});


describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    expect(reducer(void 0, {}))
    .toEqual({
      authorizationStatus: `NO_AUTH`,
    });
  });

  it(`Reducer should update state by given status`, () => {
    const stateBefore = {
      authorizationStatus: `NO_AUTH`,
    };

    const actionOne = {
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `AUTH`,
    };

    const actionTwo = {
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `NO_AUTH`,
    };

    const stateAfterOne = {
      authorizationStatus: `AUTH`,
    };

    const stateAfterTwo = {
      authorizationStatus: `NO_AUTH`,
    };

    expect(reducer(stateBefore, actionOne)).toEqual(stateAfterOne);
    expect(reducer(stateAfterOne, actionTwo)).toEqual(stateAfterTwo);
  });
});

describe(`Operation works correctly`, () => {
  it(`Send checkStatus get request on /login`, () => {
    const mockApi = new MockAdapter(api);
    const checkStatusFunc = Operation.checkAuthStatus();
    const dispatch = jest.fn();

    const updateAction = {
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `AUTH`,
    };

    mockApi
    .onGet(`/login`)
    .reply(200, {});


    return checkStatusFunc(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(updateAction);
      });
  });

  it(`Send authorization post request on /login with correct body`, () => {
    const correctBody = {
      login: `some@gmail.com`,
      password: `asd123`
    };

    const responseOnCorrect = {
      email: `some@gmail.com`,
      id: 1
    };

    const updateAction = {
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `AUTH`,
    };

    const mockApi = new MockAdapter(api);
    const sendRequest = Operation.sendAuthRequest(correctBody.login, correctBody.password);
    const dispatch = jest.fn();

    mockApi
    .onPost(`/login`)
    .reply(200, responseOnCorrect);

    return sendRequest(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(updateAction);
      });
  });
});
