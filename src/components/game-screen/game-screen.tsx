import * as React from "react";
import { Link } from "react-router-dom";

import Mistakes from '../mistakes/mistakes';
import { AppRoute } from '../../consts.js';

interface Props {
  maxMistakes: number;
  mistakes: number;
  gameType: string;
  children: React.ReactNode;
  onGoToWelcome: () => void;
}

const GameScreen: React.FunctionComponent<Props> = (props: Props) => {
  const { gameType, children, maxMistakes, mistakes, onGoToWelcome } = props;

  return (
    <section className={`game game--${gameType}`}>
      <header className="game__header">
        <Link className="game__back" to={AppRoute.ROOT} onClick={onGoToWelcome}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>


        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{ filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center` }} />
        </svg>

        <Mistakes maxMistakes={maxMistakes} mistakes={mistakes} />
      </header>
      {children}
    </section>
  );
};


export default GameScreen;
