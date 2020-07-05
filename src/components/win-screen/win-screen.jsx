import React from "react";
import PropTypes from "prop-types";

const WinScreen = (props) => {
  const {onRepeat, quantity, mistakes} = props;

  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">{`Вы ответили правильно на ${quantity - mistakes} вопросов и совершили ${mistakes} ошибки`}</p>
      <button className="replay" type="button" onClick={onRepeat}>Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  onRepeat: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default WinScreen;
