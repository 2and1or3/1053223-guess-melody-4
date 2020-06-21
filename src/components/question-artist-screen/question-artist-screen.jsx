import React from "react";
import PropTypes from "prop-types";

const QuestionArtistScreen = (props) => {
  const {question, onAnswer} = props;
  const answers = question.answers;

  return (
    <section className="game game--artist">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio src={question.trackSrc}></audio>
            </div>
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => {
            const {artist, pictureSrc: pic} = answer;

            return (
              <div className="artist" key={artist + i}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={artist}
                  id={artist + i}
                  onChange={(evt) => {
                    evt.preventDefault();
                    onAnswer(question, artist);
                  }}/>
                <label className="artist__name" htmlFor={artist + i}>
                  <img className="artist__picture" src={pic} alt={artist}/>
                  {artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    </section>
  );
};

QuestionArtistScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    trackSrc: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string.isRequired,
          pictureSrc: PropTypes.string.isRequired,
        })
    )
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuestionArtistScreen;
