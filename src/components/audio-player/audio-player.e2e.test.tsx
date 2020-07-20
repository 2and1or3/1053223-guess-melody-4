import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import AudioPlayer from './audio-player';

Enzyme.configure({adapter: new Adapter()});

describe(`AudioPlayer component`, () => {
  it(`Play button is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<AudioPlayer
      isPlaying={false}
      isLoading={false}
      onClick={onClick}
    >{[]}</AudioPlayer>);

    const playButton = wrapper.find(`.track__button`);

    playButton.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
