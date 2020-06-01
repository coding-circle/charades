import React, { useState } from "react";
import { TeamBox, PlayerList, Score, Button, Modal, TextInput } from '../components';

function Sandbox() {
  const [active, setActive] = useState(false);

  return (
    <div className="app__main app__main--home">
      <TeamBox
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
        type="alert"
        submitButtonText="Wow ok!"
      >
        <p style={{marginBottom: '12px'}}>Sup with all this wild stuff</p>
        <TextInput/>
      </Modal>
    </div>
  );
}

export default Sandbox;
