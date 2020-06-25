import React from "react";
import renderer from "react-test-renderer";

import AudioPlayer from './audio-player.jsx';

it(`Render AudioPlayer component`, () => {
  const tree = renderer
    .create(
        <AudioPlayer isPlaying = {true} src = {`path-to-track`} onPlayButtonClick = {() => {}}/>, {
          createNodeMock: (element) => {
            if (element.type === `audio`) {
              return element;
            }
            return null;
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
