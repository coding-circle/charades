import React from "react";
import "./Score.css";

const Score = ({ className, score = 0 }) => {
  const classes = `score
  ${className || ""}`;

  return (
    <div className="score">
      <span className="score__label text__all-caps text__heading text__bold">Score</span>
      <span className="score__number text__all-caps text__all-caps--large text__bold">{score}</span>
    </div>
  );
};

export default Score;



