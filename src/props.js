import PropTypes from "prop-types";

const genreProp = PropTypes.shape({
  type: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
}).isRequired;

const artistProp = PropTypes.shape({
  type: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  trackSrc: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string.isRequired,
    pictureSrc: PropTypes.string.isRequired,
  })).isRequired,
}).isRequired;

export {genreProp, artistProp};
