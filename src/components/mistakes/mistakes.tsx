import * as React from "react";

interface Props {
  maxMistakes: number;
  mistakes: number;
}

const Mistakes: React.FunctionComponent<Props> = (props: Props) => {
  const {maxMistakes, mistakes} = props;
  const empty = Array(maxMistakes).fill(``);

  return (
    <div className="game__mistakes">
      {empty.map((el, i) => <div key={i} className={mistakes > i ? `wrong` : ``}></div>)}
    </div>
  );
};

export default Mistakes;
