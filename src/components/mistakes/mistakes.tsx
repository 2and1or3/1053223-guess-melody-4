import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {maxMistakes, mistakes} = props;
  const empty = Array(maxMistakes).fill(``);

  return (
    <div className="game__mistakes">
      {empty.map((el, i) => <div key={i} className={mistakes > i ? `wrong` : ``}></div>)}
    </div>
  );
};

Mistakes.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default Mistakes;
