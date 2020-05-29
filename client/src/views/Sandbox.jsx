import React from "react";
import { TeamBox, PlayerList, Score } from '../components';

function Sandbox() {
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
    </div>
  );
}

export default Sandbox;
