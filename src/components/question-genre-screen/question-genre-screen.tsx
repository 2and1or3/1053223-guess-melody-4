import * as React from "react";

import QuestionGenreItem from '../question-genre-item/question-genre-item';
import { GenreQuestion } from '../../types.ts';

interface Props {
  question: GenreQuestion;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswers: boolean[];
  onSubmit: () => void;
  onChange: (value: boolean, id: number) => void;
}

class QuestionGenreScreen extends React.PureComponent<Props> {
  render() {
    const { question, renderPlayer, userAnswers, onSubmit, onChange } = this.props;
    const { answers, genre } = question;

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
            const { genre: genreAnswer, src } = answer;
            return (
              <QuestionGenreItem
                genreAnswer={genreAnswer}
                id={i}
                src={src}
                renderPlayer={renderPlayer}
                userAnswer={userAnswers[i]}
                onChange={onChange}
                key={genreAnswer + i}
              />);
          })}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

export default QuestionGenreScreen;
