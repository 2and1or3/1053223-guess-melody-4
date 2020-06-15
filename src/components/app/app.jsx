import React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

import PropTypes from "prop-types";

const App = (props) => {
  const {errorCount} = props;

  return <React.Fragment>
    <WelcomeScreen errorCount = {errorCount}/>
  </React.Fragment>;
};

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
};

export default App;
