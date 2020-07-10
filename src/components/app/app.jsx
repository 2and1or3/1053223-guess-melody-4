import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';

import withActivePlayer from '../../hocs/with-active-player/with-active-player.js';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.js';
import {ActionCreator} from '../../reducer/game/game.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getMistakes, getMaxMistakes, getStep} from '../../reducer/game/selectors.js';

import {GameType} from '../../consts.js';
import {genreProp, artistProp} from '../../props.js';

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);


class App extends PureComponent {
  _renderGameScreen() {
    const {questions, maxMistakes, step, onPlayClick, onAnswer, mistakes, onRepeat} = this.props;
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
      return (
        <GameOverScreen onRepeat = {onRepeat}/>
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen onRepeat = {onRepeat} quantity = {questions.length} mistakes = {mistakes}/>
      );
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
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <GameScreen gameType = {GameType.ARTIST} maxMistakes = {3} mistakes = {0}>
              <QuestionArtistScreenWrapped question = {questions[1]} onAnswer = {() => {}}/>
            </GameScreen>
          </Route>
          <Route exact path="/genre">
            <GameScreen gameType = {GameType.GENRE} maxMistakes = {3} mistakes = {0}>
              <QuestionGenreScreenWrapped question = {questions[0]} onAnswer = {() => {}}/>
            </GameScreen>
          </Route>
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
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  step: getStep(state),
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
  }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {App};
export default ConnectedApp;
