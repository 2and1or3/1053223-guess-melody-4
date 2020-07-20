import * as React from "react";
import {Link, Redirect} from "react-router-dom";

import {AppRoute, AuthorizationStatus} from '../../consts';

interface Props {
  onRepeat: () => void;
  onAuthSubmit: (login: string, password: string) => void;
  userStatus: string;
}

class AuthorizationScreen extends React.PureComponent<Props> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this._onAuthSubmit = this._onAuthSubmit.bind(this);
  }

  _onAuthSubmit(evt) {
    evt.preventDefault();
    const {onAuthSubmit} = this.props;

    const login = this.loginRef.current.value;
    const password = this.passwordRef.current.value;

    onAuthSubmit(login, password);
  }

  render() {
    const {onRepeat, userStatus} = this.props;

    const isAllow = userStatus === AuthorizationStatus.AUTH;

    return (
      isAllow ? <Redirect to={AppRoute.RESULT} /> :
        <section className="login">
          <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
          <h2 className="login__title">Вы настоящий меломан!</h2>
          <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
          <form className="login__form" action="" onSubmit={this._onAuthSubmit}>
            <p className="login__field">
              <label className="login__label" htmlFor="name">Логин</label>
              <input ref={this.loginRef} className="login__input" type="text" name="name" id="name" />
            </p>
            <p className="login__field">
              <label className="login__label" htmlFor="password">Пароль</label>
              <input ref={this.passwordRef} className="login__input" type="text" name="password" id="password" />
              <span className="login__error">Неверный пароль</span>
            </p>
            <button className="login__button button" type="submit">Войти</button>
          </form>
          <Link to={AppRoute.ROOT} className="replay" onClick={onRepeat}>Сыграть ещё раз</Link>
        </section>
    );
  }
}

export default AuthorizationScreen;
