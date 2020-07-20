import React from "react";
import Enzyme from "enzyme";
import {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withUserAnswer from './with-user-answer.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withUserAnswer(MockComponent);

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      genre: `rock`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    {
      genre: `jazz`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    {
      genre: `pop`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    {
      genre: `alternative`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    }
  ]
};

it(`HOC WithUserAnswer works correctly`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        question = {question}
        onAnswer = {() => {}}
      />);


  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(true, 0);
  expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);

  wrapper.props().onChange(false, 0);
  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(true, 1);
  expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);
});
