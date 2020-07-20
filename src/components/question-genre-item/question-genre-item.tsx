import * as React from "react";

interface Props {
  genreAnswer: string;
  src: string;
  id: number;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswer: boolean;
  onChange: (value: boolean, id: number) => void;
}

class QuestionGenreItem extends React.PureComponent<Props> {
  render() {
    const { genreAnswer, src, id, renderPlayer, userAnswer, onChange } = this.props;

    return (
      <div className="track" key={genreAnswer + id}>
        {renderPlayer(src, id)}
        <div className="game__answer">
          <input
            className="game__input visually-hidden"
            type="checkbox"
            name="answer"
            value={genreAnswer}
            id={genreAnswer + id}
            checked={userAnswer}
            onChange={(evt) => {
              const value = evt.target.checked;

              onChange(value, id);
            }} />
          <label className="game__check" htmlFor={genreAnswer + id}>Отметить</label>
        </div>
      </div>
    );
  }
}

export default QuestionGenreItem;
