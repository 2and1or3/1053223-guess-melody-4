import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';

import withActivePlayer from '../../hocs/with-audio-player/with-audio-player.js';
import {ActionCreator} from '../../reducer.js';

import {GameTypes} from '../../consts.js';

const QuestionGenreScreenWrapped = withActivePlayer(QuestionGenreScreen);
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);


class App extends PureComponent {
  _renderGameScreen() {
    const {questions, maxMistakes, step, onPlayClick, onAnswer, mistakes} = this.props;
    const question = questions[step];

    if (step === -1 || step > questions.length - 1) {
      return (
        <WelcomeScreen
          errorCount = {maxMistakes}
          onPlayClick = {onPlayClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameTypes.ARTIST:
          return (
            <GameScreen gameType = {GameTypes.ARTIST} maxMistakes = {maxMistakes} mistakes = {mistakes}>
              <QuestionArtistScreenWrapped
                question = {question}
                onAnswer = {onAnswer}
              />
            </GameScreen>
          );
        case GameTypes.GENRE:
          return (
            <GameScreen gameType = {GameTypes.GENRE} maxMistakes = {maxMistakes} mistakes = {mistakes}>
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
            <GameScreen gameType = {GameTypes.ARTIST} maxMistakes = {3} mistakes = {0}>
              <QuestionArtistScreenWrapped question = {questions[1]} onAnswer = {() => {}}/>
            </GameScreen>
          </Route>
          <Route exact path="/genre">
            <GameScreen gameType = {GameTypes.GENRE} maxMistakes = {3} mistakes = {0}>
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
  questions: PropTypes.array.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: state.mistakes,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onPlayClick: () => {
    dispatch(ActionCreator.incrementStep());
  },
  onAnswer: (question, answer) => {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  }
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {App};
export default ConnectedApp;
