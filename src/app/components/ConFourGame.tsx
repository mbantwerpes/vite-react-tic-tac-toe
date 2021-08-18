import React, { useState } from 'react';
import ConFourBoard from './ConFourBoard';

type SquareHistory = {
  squares: string[];
};

function ConFourGame(): JSX.Element {
  const [history, setHistory] = useState<SquareHistory[]>([
    { squares: Array(42).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentStep = currentHistory[currentHistory.length - 1];
    const squares = [...currentStep.squares];

    console.log(i);
    // if (i > 6) {
    //   if (!squares[i - 7]) return;
    // }

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(currentHistory.concat([{ squares: squares }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <ConFourBoard
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default ConFourGame;

function calculateWinner(squares: string[]) {
  const lines = [
    // 1st line horizontal
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    // 2nd line horizontal
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    // 3rd line horizontal
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    // 4th line horizontal
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    // 5th line horizontal
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    // 6th line horizontal
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    // Diagonals
    [3, 11, 19, 27],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [7, 15, 23, 31],
    [14, 22, 30, 38],
    // 1st line vertical
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    // 2nd line vertical
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    // 3rd line vertical
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    // 4th line vertical
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    // 5th line vertical
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    // 6th line vertical
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    // 7th line vertical
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    // if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
    //   return squares[a];
    // }
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}
