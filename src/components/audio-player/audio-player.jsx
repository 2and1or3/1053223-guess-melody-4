import React from "react";
import PropTypes from "prop-types";

import {PureComponent} from "react";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
      progress: 0,
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => this.setState({isLoading: false});

    audio.onplay = () => this.setState({isPlaying: true});

    audio.onpause = () => this.setState({isPlaying: false});

    audio.ontimeupdate = () => this.setState({progress: audio.currentTime});
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.state.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.ontimeupdate = null;
    audio.onpause = null;
    audio.onplay = null;
    audion.oncanplaythroght = null;
    audio.src = ``;
  }

  render() {
    const {onPlayButtonClick} = this.props;
    const {isPlaying, isLoading} = this.state;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {

            this.setState((state) => {
              return {isPlaying: !state.isPlaying};
            });

            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio ref={this._audioRef}></audio>
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {

};

export default AudioPlayer;
