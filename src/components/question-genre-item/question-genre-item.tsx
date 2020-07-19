import React from "react";
import {PureComponent} from "react";
import PropTypes from "prop-types";

class QuestionGenreItem extends PureComponent {
  render() {
    const {genreAnswer, src, id, renderPlayer, userAnswer, onChange} = this.props;

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
            }}/>
          <label className="game__check" htmlFor={genreAnswer + id}>Отметить</label>
        </div>
      </div>
    );
  }
}

QuestionGenreItem.propTypes = {
  genreAnswer: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionGenreItem;
