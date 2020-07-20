import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withAudio from './with-audio';
import {noop} from '../../utils';

configure({adapter: new Adapter()});

interface PlayerProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Player: React.FunctionComponent<PlayerProps> = (props: PlayerProps) => {
  const {onClick, children} = props;
  return (
    <div>
      <button onClick={onClick} />
      {children}
    </div>
  );
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

  window.HTMLMediaElement.prototype.play = noop;

  const {audioRef} = wrapper.instance();

  jest.spyOn(audioRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(audioRef.current.play).toHaveBeenCalledTimes(1);
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

  window.HTMLMediaElement.prototype.pause = noop;

  const {audioRef} = wrapper.instance();

  jest.spyOn(audioRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(audioRef.current.pause).toHaveBeenCalledTimes(1);
});
