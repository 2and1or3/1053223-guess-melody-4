import {combineReducers} from "redux";

import NameSpace from './namespace.js';

import {reducer as dataReducer} from './data/data.js';
import {reducer as gameReducer} from './game/game.js';


const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.GAME]: gameReducer,
});

export {reducer};
