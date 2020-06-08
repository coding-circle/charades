import React, { useEffect, useState } from "react";

import {
  Button,
  TeamBox,
  PlayerList,
  Score,
  Turn,
  Modal,
  TextInput,
  PointedAt,
  Scoreboard,
  Results,
} from "../../components";
import PlayAgain from "./PlayAgain";
import "./GamePlay.css";
import api from "../../utils/api";
import { useGameState } from "../../utils/useGameState";
import { useLocalStorage } from "@rehooks/local-storage";

function GamePlay({ party, username, onPoint, pointedAt }) {
  // state
  const {
    teams,
    scoreboardTeams,
    game,
    isGameOver,
    isWinner,
    turn,
    inTurn,
    actorUp,
    onDeck,
    isHost,
    userTeamIndex,
    userTeamName,
  } = useGameState({ party, username });

  const [localStorage, setLocalStorage] = useLocalStorage("charades");

  const [renameTeamInput, setRenameTeamInput] = useState(userTeamName);

  const [scoreboardOpen, setScoredboardOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isPlayAgainOpen, setIsPlayAgainOpen] = useState(false);
  const [isLeaveGameModalOpen, setIsLeaveGameModalOpen] = useState(false);
  const [isTimesUpModalOpen, setIsTimesUpModalOpen] = useState(false);
  const [isEndTurnModalOpen, setIsEndTurnModalOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(
    false
  );

  // event handlers
  const handleRenameClick = () => setIsRenameModalOpen(true);
  const handleRenameModalClose = () => setIsRenameModalOpen(false);

  const handleEndTurnClick = () => setIsEndTurnModalOpen(true);
  const handleEndTurnModalClose = () => setIsEndTurnModalOpen(false);

  const handlePlayAgainOpen = () => setIsPlayAgainOpen(true);
  const handlePlayAgainClose = () => setIsPlayAgainOpen(false);

  const handleLeaveGameClick = () => setIsLeaveGameModalOpen(true);
  const handleLeaveGameModalClose = () => setIsLeaveGameModalOpen(false);

  const handleTimesUpClick = () => setIsTimesUpModalOpen(true);
  const handleTimesUpModalClose = () => {
    handleEndTurnModalClose();
    setIsTimesUpModalOpen(false);
  };

  const handleManagePlayersClick = () => setIsManagePlayersModalOpen(true);
  const handleManagePlayersModalClose = () =>
    setIsManagePlayersModalOpen(false);

  const handleScoreboardOpen = () => setScoredboardOpen(true);
  const handleScoreboardClose = () => setScoredboardOpen(false);

  const handleRenameSubmit = async () => {
    try {
      await api.renameTeam({
        slug: party.slug,
        teamName: renameTeamInput,
        teamIndex: userTeamIndex,
      });

      handleRenameModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveGameSubmit = async () => {
    try {
      await api.leaveParty({
        slug: party.slug,
        username,
      });

      setLocalStorage({
        ...localStorage,
        slug: "",
      });

      window.location.pathname = "";

      handleLeaveGameModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimesUpSubmit = async (success) => {
    try {
      await api.endTurn({
        slug: party.slug,
        success,
      });

      handleTimesUpModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  // resets scoreboard to when not in turn
  useEffect(() => {
    // if (inTurn) {
    setScoredboardOpen(false);
    // }
  }, [inTurn]);

  if (pointedAt.pointer && pointedAt.pointer !== username) {
    return (
      <PointedAt
        pointer={pointedAt.pointer}
        pointee={pointedAt.pointee}
        username={username}
        color={teams[0].teamColor}
      />
    );
  }

  if (isPlayAgainOpen) {
    return <PlayAgain party={party} onPlayAgainClose={handlePlayAgainClose} />;
  }

  return (
    <>
      {/* scoreboard */}
      {scoreboardOpen && (
        <Scoreboard
          party={party}
          username={username}
          teams={scoreboardTeams}
          turn={turn}
          onRenameClick={handleRenameClick}
          onScoreboardClose={handleScoreboardClose}
          onLeaveGameClick={handleLeaveGameClick}
          onManagePlayersClick={handleManagePlayersClick}
        />
      )}

      {/* header */}
      {!inTurn && !scoreboardOpen && (
        <header className="app__header app__header--with-rule">
          <h1 className="text__heading app__title">Teams</h1>
        </header>
      )}

      {!scoreboardOpen && (
        <>
          <main className="app__main" style={{ paddingBottom: 0 }}>
            {teams.map((team, index) => (
              <TeamBox
                key={team.teamName}
                myTeam={team.teamPlayers.includes(username)}
                myTurn={actorUp === username}
                color={team.teamColor}
                teamName={team.teamName}
                fullHeight={inTurn}
                onRenameClick={handleRenameClick}
              >
                {inTurn ? (
                  <Turn
                    party={party}
                    username={username}
                    turn={turn}
                    actorUp={actorUp}
                    color={team.teamColor}
                    teamPlayers={team.teamPlayers}
                    onPoint={onPoint}
                    onEndTurnClick={handleEndTurnClick}
                    onTimesUpClick={handleTimesUpClick}
                  />
                ) : (
                  <div className="game-play__player-box">
                    <div className="game-play__player-list">
                      <PlayerList
                        party={party}
                        username={username}
                        color={team.teamColor}
                        players={team.teamPlayers}
                        actorUp={actorUp}
                        onDeck={onDeck}
                        host={party.host}
                      />
                      {game.turns.length > 1 && <Score score={team.score} />}
                    </div>
                    {isGameOver && index === 0 && (
                      <Results
                        teamName={team.teamName}
                        color={team.teamColor}
                        isWinner={isWinner}
                      />
                    )}
                  </div>
                )}
              </TeamBox>
            ))}
          </main>
          <footer className="app__footer">
            {inTurn && actorUp !== username && (
              <Button
                onClick={handleScoreboardOpen}
                type="secondary"
                className="button-secondary--min-width"
                icon="♛"
              >
                Scoreboard
              </Button>
            )}
            {isGameOver && isHost && (
              <Button
                onClick={handlePlayAgainOpen}
                type="secondary"
                className="button-secondary--min-width"
              >
                <div className="player__badge player__badge--host text__all-caps text__small text__bold"></div>
                <span style={{ marginLeft: "4px" }}>Play Again</span>
              </Button>
            )}
          </footer>
        </>
      )}

      {/* Rename Modal */}
      <Modal
        isActive={isRenameModalOpen}
        onClickClose={handleRenameModalClose}
        title="Rename Team?"
        submitButtonText="Rename Team"
        onClickSubmit={handleRenameSubmit}
        type="alert"
      >
        <p style={{ marginBottom: "12px" }}>Enter a new team name</p>
        <TextInput
          onChange={(e) => setRenameTeamInput(e.target.value)}
          value={renameTeamInput}
          maxLength={10}
        />
      </Modal>

      {/* Leave Game Modal */}
      <Modal
        isActive={isLeaveGameModalOpen}
        onClickClose={handleLeaveGameModalClose}
        title="Leave Game?"
        submitButtonText="Leave Game"
        onClickSubmit={handleLeaveGameSubmit}
        type="alert"
        body={<p style={{ marginBottom: "12px" }}>Leave this game now</p>}
      />

      {/* End Turn */}
      <Modal
        isActive={isEndTurnModalOpen}
        onClickClose={handleEndTurnModalClose}
        title="End Turn Now?"
        submitButtonText="End This Turn"
        onClickSubmit={handleTimesUpClick}
        type="alert"
        body={
          <p style={{ marginBottom: "12px" }}>
            Tap the button to end this turn early
          </p>
        }
      />

      {/* Time's Up Modal */}
      <Modal
        isOpaque
        isActive={isTimesUpModalOpen}
        onClickClose={handleTimesUpModalClose}
        title="Time's Up! Did You Get It?"
        onClickYes={() => handleTimesUpSubmit(true)}
        onClickNo={() => handleTimesUpSubmit(false)}
        type="confirm"
        body={
          <p style={{ marginBottom: "12px" }}>Did your team guess correctly?</p>
        }
      />

      {/* Manage Players */}
      {/* TODO, make this modal */}
      <Modal
        isActive={isManagePlayersModalOpen}
        onClickClose={handleManagePlayersModalClose}
        title="ManagePlayers?"
        submitButtonText="I'm Done"
        onClickSubmit={handleManagePlayersModalClose}
        type="alert"
      >
        {/* TODO: Add skip turn feature here! */}
        {/* TODO: Add team box with players to remove */}
      </Modal>
    </>
  );
}

export default GamePlay;
