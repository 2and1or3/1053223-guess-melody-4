import React from "react";
import {PureComponent} from "react";
import PropTypes from "prop-types";


const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
      this.setState((state) => {
        return {isPlaying: !state.isPlaying};
      });

      this.props.onPlayButtonClick();
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({isLoading: false});

      audio.onplay = () => this.setState({isPlaying: true});

      audio.onpause = () => this.setState({isPlaying: false});

      audio.ontimeupdate = () => this.setState({progress: Math.floor(audio.currentTime)});
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
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
      audio.oncanplaythrough = null;
      audio.src = ``;
    }

    render() {
      const {isPlaying, isLoading} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying = {isPlaying}
          isLoading = {isLoading}
          onClick = {this._handleClick}
        >
          {<audio ref={this._audioRef}></audio>}
        </Component>
      );
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;
