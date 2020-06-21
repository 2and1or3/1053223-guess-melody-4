import React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';

import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PureComponent} from "react";

import {GameTypes} from '../../consts.js';

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
            <QuestionArtistScreen
              question = {question}
              onAnswer = {() => {
                this.setState((prevState) => {
                  return {step: prevState.step + 1};
                });
              }}
            />
          );
        case GameTypes.GENRE:
          return (
            <QuestionGenreScreen
              question = {question}
              onAnswer = {() => {
                this.setState((prevState) => {
                  return {step: prevState.step + 1};
                });
              }}
            />
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
            <QuestionArtistScreen question = {questions[1]} onAnswer = {() => {}}/>
          </Route>
          <Route exact path="/genre">
            <QuestionGenreScreen question = {questions[0]} onAnswer = {() => {}}/>
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
