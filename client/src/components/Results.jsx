import React from "react";
import "./Results.css";

function Results({ color, teamName, result }) {
  const resultsMap = {
    win: {
      header: "Wins!",
      message: "Y’all did great! 🏆",
    },
    lose: {
      header: "Loses!",
      message: "Better luck next time 😞",
    },
    tie: {
      header: "Ties!",
      message: "It's better than losing I guess! 🤷",
    },
  };

  return (
    <div className="results">
      <h1 className="text__all-caps text__heading text__bold" style={{ color }}>
        {teamName}
      </h1>
      <h3 className="text__heading text__bold">{resultsMap[result].header}</h3>

      <p className="guessing__action-text">{resultsMap[result].message}</p>
    </div>
  );
}

export default Results;
