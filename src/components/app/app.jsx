import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.js';
import {ActionCreator} from '../../reducer/game/game.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getMistakes, getMaxMistakes, getStep} from '../../reducer/game/selectors.js';
import {getUserStatus} from '../../reducer/user/selectors.js';
import history from '../../history.js';

import {GameType, AuthorizationStatus, AppRoute} from '../../consts.js';
import {genreProp, artistProp} from '../../props.js';

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);


class App extends PureComponent {
  _renderGameScreen() {
    const {questions, maxMistakes, step, onPlayClick, onAnswer, mistakes, onRepeat, userStatus, onAuthSubmit} = this.props;
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
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (userStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (userStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen gameType = {GameType.ARTIST} maxMistakes = {maxMistakes} mistakes = {mistakes}>
              <QuestionArtistScreenWrapped
                question = {question}
                onAnswer = {onAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen gameType = {GameType.GENRE} maxMistakes = {maxMistakes} mistakes = {mistakes}>
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
    const {questions, onAuthSubmit, onRepeat, mistakes} = this.props;

    return (
      <Router history = {history}>
        <Switch>
          <Route exact path = {AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path = {AppRoute.LOGIN}>
            <AuthorizationScreen onAuthSubmit = {onAuthSubmit} onRepeat = {onRepeat}/>
          </Route>
          <Route exact path = {AppRoute.LOSE}>
            <GameOverScreen onRepeat = {onRepeat}/>
          </Route>
          <Route exact path = {AppRoute.RESULT}>
            <WinScreen onRepeat = {onRepeat} quantity = {questions.length} mistakes = {mistakes}/>
          </Route>
        </Switch>
      </Router>
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
  }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {App};
export default ConnectedApp;
