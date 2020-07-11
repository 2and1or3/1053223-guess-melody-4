import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    this._onAuthSubmit = this._onAuthSubmit.bind(this);
  }

  _onAuthSubmit(evt) {
    evt.preventDefault();
    const {onAuthSubmit} = this.props;

    const login = this._loginRef.current.value;
    const password = this._passwordRef.current.value;

    onAuthSubmit(login, password);
  }

  render() {
    const {onRepeat} = this.props;

    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
        <form className="login__form" action="" onSubmit={this._onAuthSubmit}>
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input ref={this._loginRef} className="login__input" type="text" name="name" id="name"/>
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input ref={this._passwordRef} className="login__input" type="text" name="password" id="password"/>
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
        <button className="replay" type="button" onClick={onRepeat}>Сыграть ещё раз</button>
      </section>
    );
  }
}

AuthorizationScreen.propTypes = {
  onRepeat: PropTypes.func.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
};

export default AuthorizationScreen;
