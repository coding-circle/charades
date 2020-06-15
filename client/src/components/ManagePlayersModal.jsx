import React from "react";
import { Button, Modal, TeamBox, PlayerList } from "./index";
import api from "../utils/api";

function ManagePlayersModal({ party, isActive, onClickClose, showSkipPlayer }) {
  const handleSkipPlayer = async () => {
    await api.skipPlayer({ slug: party.slug });

    onClickClose();
  };

  return (
    <Modal
      isActive={isActive}
      onClickClose={onClickClose}
      title="Manage Players"
      type="secondary"
      onClickSubmit={onClickClose}
      submitButtonText="I'm Done"
    >
      {showSkipPlayer && (
        <>
          Tap below if the current actor isn’t here
          <Button
            type="primary"
            onClick={handleSkipPlayer}
            style={{ marginTop: "8px", marginBottom: "32px" }}
          >
            Skip To Next Actor
          </Button>
        </>
      )}
      <TeamBox
        color="var(--color__foreground)"
        backgroundColor="var(--color__background)"
        players={party.players}
        teamName="Players"
      >
        <PlayerList
          isManagePlayers={isActive}
          party={party}
          color="var(--color__background)"
          backgroundColor="var(--color__foreground)"
          players={party.players}
          host={party.host}
        />
      </TeamBox>
    </Modal>
  );
}

export default ManagePlayersModal;
