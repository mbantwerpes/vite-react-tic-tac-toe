import React from 'react';

type SquareProps = {
  value: string;
  onClick: () => void;
};

function Square({ value, onClick }: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Square;
