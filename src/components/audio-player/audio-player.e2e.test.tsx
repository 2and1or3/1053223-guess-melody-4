import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import AudioPlayer from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`AudioPlayer component`, () => {
  it(`Play button is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<AudioPlayer
      isPlaying = {false}
      isLoading = {false}
      onClick = {onClick}
    >{[]}</AudioPlayer>);

    const playButton = wrapper.find(`.track__button`);

    playButton.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
