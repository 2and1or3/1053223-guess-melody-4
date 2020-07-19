import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {AuthorizationStatus, AppRoute} from '../../consts.js';
import {getUserStatus} from '../../reducer/user/selectors.js';


const PrivateRoute = (props) => {
  const {exact, render, path, userStatus} = props;

  const isAllow = userStatus === AuthorizationStatus.AUTH;
  return (
    <Route
      exact = {exact}
      path = {path}

      render = {() => {
        return (
          isAllow ? render() :
            <Redirect to = {AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});


const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export {PrivateRoute};
export default ConnectedPrivateRoute;
