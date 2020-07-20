import * as React from "react";
import * as renderer from "react-test-renderer";

import withAudio from './with-audio';
import {mockAudioNode, noop} from '../../utils';

interface MockProps {
  children: React.ReactNode;
}

const MockComponent: React.FunctionComponent<MockProps> = (props: MockProps) => {
  const {children} = props;

  return <div>{children}</div>;
};

const MockComponentWrapped = withAudio(MockComponent);

it(`Render withAudio component`, () => {
  const tree = renderer
    .create(<MockComponentWrapped
      isPlaying = {false}
      onPlayButtonClick = {noop}
      src = {`path`}
    />, {
      createNodeMock: mockAudioNode
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
