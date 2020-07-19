import React from "react";
import PropTypes from "prop-types";

import {artistProp} from '../../props.js';

const QuestionArtistScreen = (props) => {
  const {question, onAnswer, renderPlayer} = props;
  const {answers, trackSrc: src} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(src, 0)}
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
  question: artistProp,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default QuestionArtistScreen;