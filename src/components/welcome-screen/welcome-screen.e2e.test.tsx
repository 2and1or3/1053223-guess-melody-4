import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Welcome from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

describe(`Welcome component`, () => {
  it(`Button "play" available for click`, () => {
    const onButtonClick = jest.fn();

    const wrapper = shallow(<Welcome errorCount = {3} onPlayClick = {onButtonClick}/>);
    wrapper.find(`.welcome__button`).simulate(`click`);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
