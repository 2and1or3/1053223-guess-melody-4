import NameSpace from '../namespace.js';

const getUserStatus = (state) => state[NameSpace.USER].authorizationStatus;

export {getUserStatus};
