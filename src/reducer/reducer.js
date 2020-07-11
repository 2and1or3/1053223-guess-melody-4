import {combineReducers} from "redux";

import NameSpace from './namespace.js';

import {reducer as dataReducer} from './data/data.js';
import {reducer as gameReducer} from './game/game.js';
import {reducer as userReducer} from './user/user.js';


const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.GAME]: gameReducer,
  [NameSpace.USER]: userReducer,
});

export {reducer};
