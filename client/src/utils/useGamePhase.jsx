/**
 * useGamePhase.jsx
 * React hook for parsing party object and returning what phase game is in
 */
import { useMemo, useCallback } from "react";

export const useGamePhase = (party) => {
  const game = party.games[party.games.length - 1];

  const gamePhase = useMemo(() => {
    // **pre-game lobby:**
    if (party.games.length === 0) {
      return "pre-game";
    }

    // **prompt-writing:**
    else if (game.startTime === null) {
      return "prompt-writing";
    }

    // **game-play:**
    else if (game.startTime) {
      return "game-play";
    }
  }, [party]);

  return [gamePhase];
};
