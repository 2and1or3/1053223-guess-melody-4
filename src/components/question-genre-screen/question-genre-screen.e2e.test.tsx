import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow, mount} from "enzyme";

import QuestionGenreScreen from './question-genre-screen';
import {GenreQuestion, GameType} from '../../types';
import {noop} from '../../utils';

Enzyme.configure({adapter: new Adapter()});

const question: GenreQuestion = {
  type: GameType.GENRE,
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
  preventDefault: noop
};

const mockChangeEvent = {
  target: {
    checked: true
  }
};

const userAnswer: boolean[] = [true, false, false, false];

describe(`QuestionGenreScreen component`, () => {
  it(`Callback "onSubmit" receive correct args`, () => {

    const onSubmit = jest.fn((...args) => [...args]);

    const wrapper = mount(
        <QuestionGenreScreen
          onSubmit = {onSubmit}
          userAnswers = {userAnswer}
          onChange = {noop}
          question = {question}
          renderPlayer = {noop}
        />);
    const form = wrapper.find(`.game__tracks`);
    const inputs = wrapper.find(`.game__input`);
    const inputOne = inputs.at(0);

    inputOne.simulate(`change`, mockChangeEvent);
    form.simulate(`submit`, mockSubmitEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual(void 0);

    expect(
        wrapper.find(`.game__input`).map((input) => input.prop(`checked`))
    ).toEqual(userAnswer);
  });

  it(`Form sanding is prevented`, () => {
    const onSubmit = jest.fn();
    const formSendPrevention = jest.fn();

    const wrapper = shallow(
        <QuestionGenreScreen
          onSubmit = {onSubmit}
          userAnswers = {userAnswer}
          onChange = {noop}
          question = {question}
          renderPlayer = {noop}
        />);
    const form = wrapper.find(`.game__tracks`);
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });
});
