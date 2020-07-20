import NameSpace from '../namespace';

const getUserStatus = (state) => state[NameSpace.USER].authorizationStatus;

export {getUserStatus};
