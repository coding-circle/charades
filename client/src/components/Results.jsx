import React from "react";
import "./Results.css";

function Results({ color, teamName, isWinner }) {
  const resultsMap = isWinner
    ? {
        result: "Wins!",
        message: "Y’all did great! 🏆",
      }
    : {
        result: "Loses!",
        message: "Better luck next time 😞",
      };

  return (
    <div className="results">
      <h1 className="text__all-caps text__heading text__bold" style={{ color }}>
        {teamName}
      </h1>
      <h3 className="text__heading text__bold">{resultsMap.result}</h3>

      <p className="guessing__action-text">{resultsMap.message}</p>
    </div>
  );
}

export default Results;
