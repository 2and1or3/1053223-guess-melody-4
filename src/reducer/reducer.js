import {combineReducers} from "redux";

import NameSpace from './namespace';

import {reducer as dataReducer} from './data/data';
import {reducer as gameReducer} from './game/game';
import {reducer as userReducer} from './user/user';


const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.GAME]: gameReducer,
  [NameSpace.USER]: userReducer,
});

export {reducer};
