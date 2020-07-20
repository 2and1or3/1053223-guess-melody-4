import * as React from "react";
import * as renderer from "react-test-renderer";

import AudioPlayer from './audio-player';
import {mockAudioNode, noop} from '../../utils';

it(`Render AudioPlayer component`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying = {true}
          isLoading = {false}
          onClick = {noop}
        >{[]}</AudioPlayer>, {
          createNodeMock: mockAudioNode
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
