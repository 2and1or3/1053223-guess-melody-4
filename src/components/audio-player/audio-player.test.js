import React from "react";
import renderer from "react-test-renderer";

import AudioPlayer from './audio-player.jsx';
import {mockAudioNode} from '../../utils.js';

it(`Render AudioPlayer component`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying = {true}
          isLoading = {false}
          onClick = {() => {}}
        >{[]}</AudioPlayer>, {
          createNodeMock: mockAudioNode
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
