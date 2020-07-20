import * as React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import WelcomeScreen from '../welcome-screen/welcome-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import GameScreen from '../game-screen/game-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import AuthorizationScreen from '../authorization-screen/authorization-screen';
import PrivateRoute from '../private-route/private-route';

import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';
import {ActionCreator} from '../../reducer/game/game';
import {Operation as UserOperation} from '../../reducer/user/user';
import {getQuestions} from '../../reducer/data/selectors';
import {getMistakes, getMaxMistakes, getStep} from '../../reducer/game/selectors';
import {getUserStatus} from '../../reducer/user/selectors';

import {AuthorizationStatus, AppRoute} from '../../consts';
import {GameType, GenreQuestion, ArtistQuestion} from '../../types';

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

type Question = GenreQuestion | ArtistQuestion;

interface Props {
  mistakes: number;
  maxMistakes: number;
  step: number;
  questions: Question[];
  onPlayClick: () => void;
  onAnswer: (question: Question, answer: string | boolean[]) => void;
  onRepeat: () => void;
  onAuthSubmit: (login: string, password: string) => void;
  onGoToWelcome: () => void;
  userStatus: string;
}

class App extends React.PureComponent<Props> {
  _renderGameScreen() {
    const {questions, maxMistakes, step, onPlayClick, onAnswer, mistakes, onGoToWelcome, userStatus} = this.props;
    const question = questions[step];


    if (step === -1) {
      return (
        <WelcomeScreen
          errorCount={maxMistakes}
          onPlayClick={onPlayClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return <Redirect to={AppRoute.LOSE} />;
    }

    if (step >= questions.length) {
      if (userStatus === AuthorizationStatus.AUTH) {
        return <Redirect to={AppRoute.RESULT} />;
      } else if (userStatus === AuthorizationStatus.NO_AUTH) {
        return <Redirect to={AppRoute.LOGIN} />;
      }
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen gameType={GameType.ARTIST} maxMistakes={maxMistakes} mistakes={mistakes} onGoToWelcome={onGoToWelcome}>
              <QuestionArtistScreenWrapped
                question={question}
                onAnswer={onAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen gameType={GameType.GENRE} maxMistakes={maxMistakes} mistakes={mistakes} onGoToWelcome={onGoToWelcome}>
              <QuestionGenreScreenWrapped
                question={question}
                onAnswer={onAnswer}
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
            <AuthorizationScreen onAuthSubmit={onAuthSubmit} onRepeat={onRepeat} userStatus={userStatus} />
          </Route>
          <Route path={AppRoute.LOSE} exact>
            <GameOverScreen onRepeat={onRepeat} />
          </Route>
          <PrivateRoute exact path={AppRoute.RESULT} render={() => <WinScreen onRepeat={onRepeat} quantity={questions.length} mistakes={mistakes} />}>

          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

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
