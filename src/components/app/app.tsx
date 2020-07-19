import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';
import PrivateRoute from '../private-route/private-route.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.js';
import {ActionCreator} from '../../reducer/game/game.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getMistakes, getMaxMistakes, getStep} from '../../reducer/game/selectors.js';
import {getUserStatus} from '../../reducer/user/selectors.js';

import {GameType, AuthorizationStatus, AppRoute} from '../../consts.js';
import {genreProp, artistProp} from '../../props.js';

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);


class App extends PureComponent {
  _renderGameScreen() {
    const {questions, maxMistakes, step, onPlayClick, onAnswer, mistakes, onGoToWelcome, userStatus} = this.props;
    const question = questions[step];


    if (step === -1) {
      return (
        <WelcomeScreen
          errorCount = {maxMistakes}
          onPlayClick = {onPlayClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return <Redirect to={AppRoute.LOSE}/>;
    }

    if (step >= questions.length) {
      if (userStatus === AuthorizationStatus.AUTH) {
        return <Redirect to={AppRoute.RESULT}/>;
      } else if (userStatus === AuthorizationStatus.NO_AUTH) {
        return <Redirect to={AppRoute.LOGIN}/>;
      }
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen gameType = {GameType.ARTIST} maxMistakes = {maxMistakes} mistakes = {mistakes} onGoToWelcome = {onGoToWelcome}>
              <QuestionArtistScreenWrapped
                question = {question}
                onAnswer = {onAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen gameType = {GameType.GENRE} maxMistakes = {maxMistakes} mistakes = {mistakes} onGoToWelcome = {onGoToWelcome}>
              <QuestionGenreScreenWrapped
                question = {question}
                onAnswer = {onAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }


  render() {
    const {questions, onAuthSubmit, onRepeat, mistakes, userStatus} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthorizationScreen onAuthSubmit = {onAuthSubmit} onRepeat = {onRepeat} userStatus = {userStatus}/>
          </Route>
          <Route path={AppRoute.LOSE} exact>
            <GameOverScreen onRepeat = {onRepeat}/>
          </Route>
          <PrivateRoute exact path={AppRoute.RESULT} render={() => <WinScreen onRepeat = {onRepeat} quantity = {questions.length} mistakes = {mistakes}/>}>

          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.oneOfType([genreProp, artistProp])).isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onRepeat: PropTypes.func.isRequired,
  userStatus: PropTypes.string.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  onGoToWelcome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  step: getStep(state),
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlayClick: () => {
    dispatch(ActionCreator.incrementStep());
  },
  onAnswer: (question, answer) => {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  onRepeat: () => {
    dispatch(ActionCreator.repeatGame());
  },
  onAuthSubmit: (login, password) => {
    dispatch(UserOperation.sendAuthRequest(login, password));
  },
  onGoToWelcome: () => {
    dispatch(ActionCreator.toWelcome());
  }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {App};
export default ConnectedApp;
