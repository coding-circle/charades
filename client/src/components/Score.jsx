import React from "react";
import "./Score.css";

const Score = (props) => {
  const classes = `score
  ${props.className ? props.className : ""}`;

  const score = props.score || 0;

  return (
    <div class="score">
      <span class="score__label text__all-caps text__bold">Score</span>
      <span class="score__number text__all-caps text__all-caps--large text__bold">{score}</span>
    </div>
  );
};

export default Score;



