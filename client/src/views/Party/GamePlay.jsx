import React, { useMemo, useState } from "react";

import {
  TeamBox,
  PlayerList,
  Score,
  Turn,
  Modal,
  TextInput,
} from "../../components";
import "./GamePlay.css";
import api from "../../utils/api";
import { useGameState } from "../../utils/useGameState";

function GamePlay({ party, username, isHost, onPoint, pointedAt }) {
  const {
    teams,
    scoreboardTeams,
    game,
    turn,
    inTurn,
    actorUp,
    onDeck,
    userTeamIndex,
    userTeamName,
  } = useGameState({ party, username });

  const [renameTeamInput, setRenameTeamInput] = useState(userTeamName);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isLeaveGameModalOpen, setIsLeaveGameModalOpen] = useState(false);
  const [isTimesUpModalOpen, setIsTimesUpModalOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(
    false
  );

  const handleRenameClick = () => setIsRenameModalOpen(true);
  const handleRenameModalClose = () => setIsRenameModalOpen(false);

  const handleLeaveGameClick = () => setIsLeaveGameModalOpen(true);
  const handleLeaveGameModalClose = () => setIsLeaveGameModalOpen(false);

  const handleTimesUpClick = () => setIsTimesUpModalOpen(true);
  const handleTimesUpModalClose = () => setIsTimesUpModalOpen(false);

  const handleManagePlayersClick = () => setIsManagePlayersModalOpen(true);
  const handleManagePlayersModalClose = () =>
    setIsManagePlayersModalOpen(false);

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

  return (
    <>
      {!inTurn && (
        <header className="app__header app__header--with-rule">
          <h1 className="text__heading app__title">Teams</h1>
        </header>
      )}
      <main className="app__main">
        {teams.map((team, index) => (
          <TeamBox
            key={team.teamName}
            myTeam={team.teamPlayers.includes(username)}
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
                players={team.teamPlayers}
              />
            ) : (
              <>
                <PlayerList
                  party={party}
                  username={username}
                  color={team.teamColor}
                  players={team.teamPlayers}
                  actorUp={actorUp}
                  onDeck={onDeck}
                />
                {game.turns.length > 1 && <Score score={team.score} />}
              </>
            )}
          </TeamBox>
        ))}
      </main>

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

      {/* Time's Up Modal */}
      <Modal
        isOpaque
        isActive={isTimesUpModalOpen}
        onClickClose={handleTimesUpModalClose}
        title="Time's Up! Did You Get It?"
        onClickYes={() => handleTimesUpSubmit(true)}
        onClickNo={() => handleTimesUpSubmit(true)}
        type="confirm"
        body={
          <p style={{ marginBottom: "12px" }}>Did your team guess correctly?</p>
        }
      />

      {/* Manage Players */}
      <Modal
        isOpaque
        isActive={isManagePlayersModalOpen}
        onClickClose={handleManagePlayersModalClose}
        title="Time's Up! Did You Get It?"
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
