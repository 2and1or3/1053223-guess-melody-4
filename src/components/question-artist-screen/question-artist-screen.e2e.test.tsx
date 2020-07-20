import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import QuestionArtistScreen from './question-artist-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const question = {
  type: `artist`,
  artist: `true-person`,
  trackSrc: `src-for-track`,
  answers: [
    {
      artist: `true-person`,
      pictureSrc: `http://placehold.it/134x134`,
    },
    {
      artist: `person-2`,
      pictureSrc: `http://placehold.it/134x134`,
    },
    {
      artist: `person-3`,
      pictureSrc: `http://placehold.it/134x134`,
    },
  ]
};

const mockEvent = {
  preventDefault() {}
};

describe(`QuestionArtistScreen component`, () => {
  it(`Callback "onAnswer" receive correct args`, () => {
    const onAnswer = jest.fn();

    const userAnswer = `true-person`;

    const wrapper = shallow(<QuestionArtistScreen question = {question} onAnswer = {onAnswer} renderPlayer = {() => {}}/>);
    const input = wrapper.find(`.artist__input`).at(0);

    input.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatch(userAnswer);
  });
});
