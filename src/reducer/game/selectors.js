import NameSpace from '../namespace.js';

const getMistakes = (state) => state[NameSpace.GAME].mistakes;

const getMaxMistakes = (state) => state[NameSpace.GAME].maxMistakes;

const getStep = (state) => state[NameSpace.GAME].step;

export {getMistakes, getMaxMistakes, getStep};
