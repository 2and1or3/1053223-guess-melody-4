import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio.js";

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onClick, children} = props;
  return (
    <div>
      <button onClick={onClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that HOC's callback turn on audio (play)`, () => {
  const PlayerWrapped = withAudio(Player);

  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    onPlayButtonClick={() => {
      wrapper.setProps({isPlaying: true});
    }}
    src=""
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_audioRef} = wrapper.instance();

  jest.spyOn(_audioRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's callback turn off audio (pause)`, () => {
  const PlayerWrapped = withAudio(Player);
  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    onPlayButtonClick={() => {
      wrapper.setProps({isPlaying: false});
    }}
    src=""
  />);

  window.HTMLMediaElement.prototype.pause = () => {};

  const {_audioRef} = wrapper.instance();

  jest.spyOn(_audioRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
});