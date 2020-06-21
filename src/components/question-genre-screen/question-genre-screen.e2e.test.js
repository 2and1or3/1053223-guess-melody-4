import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import QuestionGenreScreen from './question-genre-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      genre: `rock`,
      src: `src-for-track-1`,
    },
    {
      genre: `jazz`,
      src: `src-for-track-2`,
    },
    {
      genre: `pop`,
      src: `src-for-track-3`,
    },
    {
      genre: `alternative`,
      src: `src-for-track-4`,
    }
  ]
};

const mockSubmitEvent = {
  preventDefault() {}
};

const mockChangeEvent = {
  target: {
    checked: true
  }
};

describe(`QuestionGenreScreen component`, () => {
  it(`Callback "onAnswer" receive correct args`, () => {
    const userAnswer = [true, false, false, false];

    const onAnswer = jest.fn();

    const wrapper = shallow(<QuestionGenreScreen onAnswer = {onAnswer} question = {question}/>);
    const form = wrapper.find(`.game__tracks`);
    const inputs = wrapper.find(`.game__input`);
    const inputOne = inputs.at(0);

    inputOne.simulate(`change`, mockChangeEvent);

    form.simulate(`submit`, mockSubmitEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);

    expect(
        wrapper.find(`.game__input`).map((input) => input.prop(`checked`))
    ).toEqual(userAnswer);
  });

  it(`Form sanding is prevented`, () => {
    const onAnswer = jest.fn();
    const formSendPrevention = jest.fn();

    const wrapper = shallow(<QuestionGenreScreen onAnswer = {onAnswer} question = {question}/>);
    const form = wrapper.find(`.game__tracks`);
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });
});
