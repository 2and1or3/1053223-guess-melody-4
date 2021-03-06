import {reducer, ActionType, ActionCreator} from './game';


describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    expect(
        reducer(void 0, {})
    ).toEqual({
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
    });
  });

  it(`Reducer should return incremented step field by a given payload`, () => {
    const stateBefore = {
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
    };

    const action = {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };

    const stateAfter = {
      mistakes: 0,
      step: 0,
      maxMistakes: 3,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return incremented mistakes field by a given payload`, () => {
    const stateBefore = {
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
    };
    const action = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };
    const stateAfter = {
      mistakes: 1,
      step: -1,
      maxMistakes: 3,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should change step field on 0`, () => {
    const stateBefore = {
      mistakes: 0,
      step: 2,
      maxMistakes: 3,
    };
    const action = {
      type: ActionType.REPEAT_GAME,
      payload: null,
    };
    const stateAfter = {
      mistakes: 0,
      step: 0,
      maxMistakes: 3,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should set step in -1`, () => {
    const stateBefore = {
      mistakes: 0,
      step: 2,
      maxMistakes: 3,
    };
    const action = {
      type: ActionType.GO_TO_WELCOME,
      payload: null,
    };
    const stateAfter = {
      mistakes: 0,
      step: -1,
      maxMistakes: 3,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator return correct INCREMENT_STEP action`, () => {
    const correctAction = {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };

    expect(ActionCreator.incrementStep()).toEqual(correctAction);
  });


  it(`When action creator accept true answer by genre question, it should return action with increment mistakes by 0`, () => {
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
    const userAnswers = [true, false, false, false];
    const correctAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };

    expect(ActionCreator.incrementMistakes(question, userAnswers)).toEqual(correctAction);
  });

  it(`When action creator accept false answer by genre question, it should return action with increment mistakes by 1`, () => {
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
    const userAnswers = [false, false, false, true];
    const correctAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };

    expect(ActionCreator.incrementMistakes(question, userAnswers)).toEqual(correctAction);
  });

  it(`When action creator accept true answer by artist question, it should return action with increment mistakes by 0`, () => {
    const question = {
      type: `artist`,
      artist: `true-person`,
      trackSrc: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
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
    const userAnswer = `true-person`;
    const correctAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };

    expect(ActionCreator.incrementMistakes(question, userAnswer)).toEqual(correctAction);
  });

  it(`When action creator accept false answer by artist question, it should return action with increment mistakes by 1`, () => {
    const question = {
      type: `artist`,
      artist: `true-person`,
      trackSrc: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
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
    const userAnswer = `false-person`;
    const correctAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };

    expect(ActionCreator.incrementMistakes(question, userAnswer)).toEqual(correctAction);
  });

  it(`Action creator should return correct action for repeatGame`, () => {
    const correctAction = {
      type: ActionType.REPEAT_GAME,
      payload: null,
    };

    expect(ActionCreator.repeatGame()).toEqual(correctAction);
  });

  it(`Action creator should return correct action for toWelcome`, () => {
    const correctAction = {
      type: ActionType.GO_TO_WELCOME,
      payload: null,
    };

    expect(ActionCreator.toWelcome()).toEqual(correctAction);
  });
});
