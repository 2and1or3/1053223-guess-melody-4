import React from "react";
import PropTypes from "prop-types";

import AudioPlayer from '../audio-player/audio-player.jsx';

const QuestionArtistScreen = (props) => {
  const {question, onAnswer} = props;
  const answers = question.answers;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <AudioPlayer src = {question.trackSrc} isPlaying = {true}/>
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
