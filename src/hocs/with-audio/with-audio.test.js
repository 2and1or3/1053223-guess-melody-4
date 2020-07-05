import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withAudio from './with-audio.js';
import {mockAudioNode} from '../../utils.js';

const MockComponent = (props) => {
  const {children} = props;

  return <div>{children}</div>;
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const MockComponentWrapped = withAudio(MockComponent);

it(`Render withAudio component`, () => {
  const tree = renderer
    .create(<MockComponentWrapped
      isPlaying = {false}
      onPlayButtonClick = {() => {}}
      src = {`path`}
    />, {
      createNodeMock: mockAudioNode
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
