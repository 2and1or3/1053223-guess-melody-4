import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import QuestionGenreItem from '../question-genre-item/question-genre-item.jsx';
import {genreProp} from '../../props.js';

class QuestionGenreScreen extends PureComponent {
  render() {
    const {question, renderPlayer, userAnswers, onSubmit, onChange} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit();
          }}>
          {answers.map((answer, i) => {
            const {genre: genreAnswer, src} = answer;
            return (
              <QuestionGenreItem
                genreAnswer = {genreAnswer}
                id = {i}
                src = {src}
                renderPlayer = {renderPlayer}
                userAnswer = {userAnswers[i]}
                onChange = {onChange}
                key = {genreAnswer + i}
              />);
          })}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

QuestionGenreScreen.propTypes = {
  question: genreProp,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionGenreScreen;
