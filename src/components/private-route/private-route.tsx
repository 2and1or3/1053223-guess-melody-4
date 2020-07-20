import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus, AppRoute} from '../../consts';
import {getUserStatus} from '../../reducer/user/selectors';

interface Props {
  exact: boolean;
  render: () => React.ReactNode;
  path: string;
  userStatus: string;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {exact, render, path, userStatus} = props;

  const isAllow = userStatus === AuthorizationStatus.AUTH;
  return (
    <Route
      exact={exact}
      path={path}

      render={() => {
        return (
          isAllow ? render() :
            <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});


const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export {PrivateRoute};
export default ConnectedPrivateRoute;
