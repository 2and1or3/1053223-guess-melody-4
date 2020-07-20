import {GameType} from './types.ts';

const mockAudioNode = (element) => {
  if (element.type === `audio`) {
    return element;
  }

  return null;
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const adapterForGenreType = (question) => question;

const adapterForArtistType = (question) => ({
  type: question.type,
  artist: question.song.artist,
  trackSrc: question.song.src,
  answers: question.answers.map((answer) => ({
    artist: answer.artist,
    pictureSrc: answer.picture,
  }))
});

const adapterToLocalQuestions = (questions) => {

  const localQuestions = questions.map((question) => {
    switch (question.type) {
      case (GameType.ARTIST):
        return adapterForArtistType(question);
      case (GameType.GENRE):
        return adapterForGenreType(question);

      default:
        return question;
    }
  });

  return localQuestions;
};

export {mockAudioNode, adapterToLocalQuestions, extend};
