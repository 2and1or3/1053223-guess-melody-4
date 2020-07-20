import * as React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from '../../consts';

interface Props {
  onRepeat: () => void;
  quantity: number;
  mistakes: number;
}

const WinScreen: React.FunctionComponent<Props> = (props: Props) => {
  const { onRepeat, quantity, mistakes } = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">{`Вы ответили правильно на ${quantity - mistakes} вопросов и совершили ${mistakes} ошибки`}</p>
      <Link className="replay" to={AppRoute.ROOT} onClick={onRepeat}>Сыграть ещё раз</Link>
    </section>
  );
};

export default WinScreen;
