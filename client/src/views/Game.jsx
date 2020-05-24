import React from "react";

// Logic for which game view and what what props are passed down is handled here.
function Game({ slug, username }) {
  return (
    <main className="app_main">
      <h2 className="text__heading">{slug}</h2>
      <p>{username}</p>
    </main>
  );
}

export default Game;
