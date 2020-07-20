import * as React from "react";
import { Subtract } from "utility-types";

interface Props {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  src: string;
}

interface State {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
}

interface InjectedProps {
  isPlaying: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const withAudio = (Component) => {

  type WrappedComponentProps = React.ComponentProps<typeof Component>

  type Self = Props & Subtract<WrappedComponentProps, InjectedProps>


  class WithAudio extends React.PureComponent<Self, State> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
      this.setState((state) => {
        return { isPlaying: !state.isPlaying };
      });

      this.props.onPlayButtonClick();
    }

    componentDidMount() {
      const { src } = this.props;
      const audio = this.audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({ isLoading: false });

      audio.onplay = () => this.setState({ isPlaying: true });

      audio.onpause = () => this.setState({ isPlaying: false });

      audio.ontimeupdate = () => this.setState({ progress: Math.floor(audio.currentTime) });
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      audio.ontimeupdate = null;
      audio.onpause = null;
      audio.onplay = null;
      audio.oncanplaythrough = null;
      audio.src = ``;
    }

    render() {
      const { isPlaying, isLoading } = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onClick={this._handleClick}
        >
          {<audio ref={this.audioRef}></audio>}
        </Component>
      );
    }
  }

  return WithAudio;
};

export default withAudio;
