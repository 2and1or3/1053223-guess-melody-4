import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Welcome from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Welcome component`, () => {
  it(`Button "play" available for click`, () => {
    const onButtonClick = jest.fn();

    const wrapper = shallow(<Welcome errorCount = {3} onPlayClick = {onButtonClick}/>);
    wrapper.find(`.welcome__button`).simulate(`click`);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
