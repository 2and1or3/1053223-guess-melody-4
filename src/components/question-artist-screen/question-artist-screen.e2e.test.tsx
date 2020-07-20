import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import QuestionArtistScreen from './question-artist-screen';
import {ArtistQuestion, GameType} from '../../types';
import {noop} from '../../utils';

Enzyme.configure({adapter: new Adapter()});

const question: ArtistQuestion = {
  type: GameType.ARTIST,
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
  preventDefault: noop
};

describe(`QuestionArtistScreen component`, () => {
  it(`Callback "onAnswer" receive correct args`, () => {
    const onAnswer = jest.fn();

    const userAnswer = `true-person`;

    const wrapper = shallow(<QuestionArtistScreen question={question} onAnswer={onAnswer} renderPlayer={noop} />);
    const input = wrapper.find(`.artist__input`).at(0);

    input.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatch(userAnswer);
  });
});
