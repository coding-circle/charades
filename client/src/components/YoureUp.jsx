import React from "react";

import "./YoureUp.css";
import { Button } from "../components";
import api from "../utils/api";

function YoureUp({ party }) {
  const firstTurn = party.games[party.games.length - 1].turns.length === 1;

  const handleYoureUpClick = async () => {
    try {
      await api.startTurn({ slug: party.slug });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="youre-up">
      <h3 className="youre-up__title">
        {firstTurn ? "You Go First!" : "You're Up"}
      </h3>
      <p className="youre-up__text">
        Tap the button when you are ready to act out a prompt
      </p>
      <Button
        onClick={handleYoureUpClick}
        className="youre-up__button"
        type="primary"
      >
        I'm Ready
      </Button>
    </div>
  );
}

export default YoureUp;
