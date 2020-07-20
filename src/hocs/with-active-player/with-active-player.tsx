import * as React from "react";
import {Subtract} from "utility-types";

import AudioPlayer from '../../components/audio-player/audio-player';
import withAudio from '../with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

interface State {
  activePlayer: number;
}

interface InjectedProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}

const withActivePlayer = (Component) => {

  type WrappedComponentProps = React.ComponentProps<typeof Component>

  type Self = Subtract<WrappedComponentProps, InjectedProps>

  class WithActivePlayer extends React.PureComponent<Self, State> {
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
          renderPlayer={(src, id) => {
            return (
              <AudioPlayerWrapped
                isPlaying={id === activePlayer}
                src={src}
                onPlayButtonClick={() => this.setState({activePlayer: activePlayer === id ? -1 : id})}
              />
            );
          }}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
