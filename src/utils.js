const mockAudioNode = (element) => {
  if (element.type === `audio`) {
    return element;
  }

  return null;
};

export {mockAudioNode};
