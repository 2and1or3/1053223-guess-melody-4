import React from "react";
import {PureComponent} from "react";

import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withAudio from '../with-audio/with-audio.js';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: 0,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer = {(src, id) => {
            return (
              <AudioPlayerWrapped
                isPlaying = {id === activePlayer}
                src = {src}
                onPlayButtonClick={() => this.setState({activePlayer: activePlayer === id ? -1 : id})}
              />
            );
          }}
        />
      );
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
