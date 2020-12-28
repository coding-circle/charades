import React from "react";
import { Modal } from "./index";
import "./HowToPlayModal.css";

function HowToPlayModal({ isActive, onClickClose }) {
  return (
    <>
      <Modal
        isActive={isActive}
        onClickClose={onClickClose}
        title="How to Play"
        type="secondary"
        submitButtonText="I Understand"
        text__heading="How to Play"
        onClickSubmit={onClickClose}
      >
        <div>
          <p className="how-to-play-text">
            Charades Space is an interactive charades companion app that can be
            played remotely (with zoom) or in-person. It will help with all
            phases of the game from creating teams, adding prompts, keeping the
            score and more!
          </p>
          <p className="how-to-play-text">
            To play, the host will create a party. Then share that room code
            with friends. Once everyone in your party has joined the lobby
            (minimum 4 people), the game is ready to begin!
          </p>
        </div>
      </Modal>
    </>
  );
}

export default HowToPlayModal;
