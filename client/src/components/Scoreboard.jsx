import React from "react";

import {
  Button,
  TeamBox,
  PlayerList,
  Score,
  TimerWidget,
  PreviousTurnBox,
} from "./index";
import { useGameState } from "../utils/useGameState";

function Scoreboard({
  party,
  username,
  countdown,
  percentage,
  onRenameClick,
  onScoreboardClose,
  onLeaveGameClick,
  onManagePlayersClick,
}) {
  const {
    scoreboardTeams,
    isHost,
    actorUp,
    onDeck,
    activeTeam,
    previousTurn,
  } = useGameState({
    party,
    username,
  });

  return (
    <>
      <header
        className="app__header app__header--with-rule"
        style={{ justifyContent: "space-between" }}
      >
        {isHost ? (
          <Button
            onClick={onManagePlayersClick}
            type="secondary"
            className="button-secondary--min-width"
          >
            <div className="player__badge player__badge--host text__all-caps text__small text__bold"></div>
            {"  "}
            Manage Players
          </Button>
        ) : (
          <Button
            onClick={onLeaveGameClick}
            type="secondary"
            className="button-secondary--min-width"
            icon="✕"
          >
            Leave Game
          </Button>
        )}
        <TimerWidget
          countdown={countdown}
          percentage={percentage}
          size="small"
          color={activeTeam.teamColor}
        />
      </header>

      <main className="app__main" style={{ paddingBottom: 0 }}>
        {previousTurn && <PreviousTurnBox {...previousTurn} />}
        {scoreboardTeams.map((team, index) => (
          <TeamBox
            key={team.teamName}
            myTeam={team.teamPlayers.includes(username)}
            myTurn={actorUp === username}
            backgroundColor={team.teamColor}
            teamName={team.teamName}
            onRenameClick={onRenameClick}
          >
            <PlayerList
              party={party}
              username={username}
              color={team.teamColor}
              host={party.host}
              players={team.teamPlayers}
              actorUp={actorUp}
              onDeck={onDeck}
            />
            <Score score={team.score} />
          </TeamBox>
        ))}
      </main>
      <footer className="app__footer">
        <Button
          onClick={onScoreboardClose}
          type="secondary"
          className="button-secondary--min-width"
          icon="⏎"
        >
          Actor Up
        </Button>
      </footer>
    </>
  );
}

export default Scoreboard;
