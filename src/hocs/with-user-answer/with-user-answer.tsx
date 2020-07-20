import * as React from "react";
import { Subtract } from "utility-types";

import { GenreQuestion } from '../../types';

interface Props {
  onAnswer: (question: GenreQuestion, answer: boolean[]) => void;
  question: GenreQuestion;
}

interface State {
  answers: boolean[];
}

interface InjectedProps {
  userAnswers: boolean[];
  onSubmit: () => void;
  onChange: (value: boolean, i: number) => void;
}

const withUserAnswer = (Component) => {

  type WrappedComponentProps = React.ComponentProps<typeof Component>

  type Self = Props & Subtract<WrappedComponentProps, InjectedProps>

  class WithUserAnswer extends React.PureComponent<Self, State> {
    constructor(props) {
      super(props);

      this.state = {
        answers: [false, false, false, false],
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleChange = this._handleChange.bind(this);
    }

    _handleSubmit() {
      const { onAnswer, question } = this.props;

      onAnswer(question, this.state.answers);
    }

    _handleChange(value, i) {
      const { answers: userAnswers } = this.state;
      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)]
      });
    }

    render() {
      const { answers: userAnswers } = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={userAnswers}
          onSubmit={this._handleSubmit}
          onChange={this._handleChange}
        />
      );
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
