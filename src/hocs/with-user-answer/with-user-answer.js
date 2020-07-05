import React from "react";
import {PureComponent} from "react";
import PropTypes from "prop-types";

import {genreProp} from '../../props.js';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: [false, false, false, false],
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleChange = this._handleChange.bind(this);
    }

    _handleSubmit() {
      const {onAnswer, question} = this.props;

      onAnswer(question, this.state.answers);
    }

    _handleChange(value, i) {
      const {answers: userAnswers} = this.state;
      this.setState({
        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)]
      });
    }

    render() {
      const {answers: userAnswers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers = {userAnswers}
          onSubmit = {this._handleSubmit}
          onChange = {this._handleChange}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: genreProp,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
