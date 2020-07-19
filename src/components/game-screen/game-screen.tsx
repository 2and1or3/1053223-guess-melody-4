import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Mistakes from '../mistakes/mistakes.jsx';
import {AppRoute} from '../../consts.js';

const GameScreen = (props) => {
  const {gameType, children, maxMistakes, mistakes, onGoToWelcome} = props;

  return (
    <section className={`game game--${gameType}`}>
      <header className="game__header">
        <Link className="game__back" to={AppRoute.ROOT} onClick={onGoToWelcome}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>


        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <Mistakes maxMistakes = {maxMistakes} mistakes = {mistakes} />
      </header>
      {children}
    </section>
  );
};

GameScreen.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onGoToWelcome: PropTypes.func.isRequired,
};

export default GameScreen;
