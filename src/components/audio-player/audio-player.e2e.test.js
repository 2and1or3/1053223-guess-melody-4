import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import AudioPlayer from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`AudioPlayer component`, () => {
  it(`Play button changes onClick`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<AudioPlayer
      isPlaying = {true}
      src = {`path-to-track`}
      onPlayButtonClick = {onClick}/>,
    {disableLifecycleMethods: true});

    const playButton = wrapper.find(`.track__button`);

    expect(wrapper.exists(`.track__button--pause`)).toBe(true);

    playButton.simulate(`click`);

    expect(wrapper.exists(`.track__button--play`)).toBe(true);

    playButton.simulate(`click`);

    expect(wrapper.exists(`.track__button--pause`)).toBe(true);
    expect(wrapper.exists(`.track__button--play`)).toBe(false);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
