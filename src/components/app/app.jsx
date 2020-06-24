import React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import withActivePlayer from '../../hocs/with-audio-player/with-audio-player.js';

import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PureComponent} from "react";

import {GameTypes} from '../../consts.js';

const QuestionGenreScreenWrapped = withActivePlayer(QuestionGenreScreen);
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    const {errorCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step > questions.length - 1) {
      return (
        <WelcomeScreen
          errorCount = {errorCount}
          onPlayClick = {() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameTypes.ARTIST:
          return (
            <GameScreen gameType = {GameTypes.ARTIST}>
              <QuestionArtistScreenWrapped
                question = {question}
                onAnswer = {() => {
                  this.setState((prevState) => {
                    return {step: prevState.step + 1};
                  });
                }}
              />
            </GameScreen>
          );
        case GameTypes.GENRE:
          return (
            <GameScreen gameType = {GameTypes.GENRE}>
              <QuestionGenreScreenWrapped
                question = {question}
                onAnswer = {() => {
                  this.setState((prevState) => {
                    return {step: prevState.step + 1};
                  });
                }}
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
            <GameScreen gameType = {GameTypes.ARTIST}>
              <QuestionArtistScreenWrapped question = {questions[1]} onAnswer = {() => {}}/>
            </GameScreen>
          </Route>
          <Route exact path="/genre">
            <GameScreen gameType = {GameTypes.GENRE}>
              <QuestionGenreScreenWrapped question = {questions[0]} onAnswer = {() => {}}/>
            </GameScreen>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
