import * as React from "react";

interface Props {
  isPlaying: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

class AudioPlayer extends React.PureComponent<Props> {

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

export default AudioPlayer;
