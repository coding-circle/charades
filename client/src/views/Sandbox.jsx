import React, { useState } from "react";
import {
  TeamBox,
  PlayerList,
  Score,
  Button,
  Modal,
  TextInput,
  TimerWidget,
} from "../components";

function Sandbox() {
  const [active, setActive] = useState(false);

  return (
    <div className="app__main">
      {/* <TeamBox
        teamName={'Christmas Santas'}
        myTeam={true}
        color={'aquamarine'}
      >
        <PlayerList
          players={['Fortch', 'Stung', 'Pristina']}
          host={'Stung'}
          actorUp={'Fortch'}
          onDeck={'Pristina'}
          color={'aquamarine'}
          />
        <Score score={48} />
      </TeamBox>
      <Button onClick={() => setActive(true)}>open modal</Button>
      <Modal
        title="I Wish U Would?"
        isActive={active}
        onClickClose={() => setActive(false)}
        onClickSubmit={() => console.log('submit')}
        type="alert"
        submitButtonText="Wow ok!"
      >
        <p style={{marginBottom: '12px'}}>Sup with all this wild stuff</p>
        <TextInput/>
      </Modal> */}
      <h1> Timer Widget </h1>
      <br />
      <br />

      <TimerWidget
        startTime={Date.now() + 3000}
        turnDurationSeconds={60}
        size="small"
      />
      <br />
      <TimerWidget
        startTime={Date.now() + 3000}
        turnDurationSeconds={60}
        size="medium"
      />
      <br />
      <TimerWidget
        startTime={Date.now() + 3000}
        turnDurationSeconds={60}
        size="large"
      />
    </div>
  );
}

export default Sandbox;
