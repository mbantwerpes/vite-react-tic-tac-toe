import React from 'react';

type SquareProps = {
  value: string;
  onClick: () => void;
};

function ConFourSquare({ value, onClick }: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default ConFourSquare;
