import React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {errorCount} = props;

  return <React.Fragment>
    <WelcomeScreen errorCount = {errorCount}/>
  </React.Fragment>;
};

export default App;
