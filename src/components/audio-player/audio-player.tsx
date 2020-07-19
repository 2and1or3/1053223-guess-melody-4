import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";


class AudioPlayer extends PureComponent {


  render() {
    const {isPlaying, isLoading, onClick, children} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onClick}
        />
        <div className="track__status">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
