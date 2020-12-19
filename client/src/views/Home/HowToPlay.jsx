import React, { useState } from "react";

import { CloseButton, Button, LoadingIndicator } from "../../components";

function HowToPlay({ hideHowToPlay }) {
  // make sure loading screen shows for at least 1 second since clicking button
  // and 1/10th a second since setting local storage
  // setTimeout(() => {
  //   window.location.pathname = slug;
  // }, Math.min(100, Math.max(0, Date.now() - startTime + 1000)));

  // if (isCreatingParty) {
  //   return <LoadingIndicator />;
  // }

  return (
    <>
      <header className="app__header app__header--with-rule">
        <h1 className="text__heading app__title">CharadesSpace</h1>
        <CloseButton onClick={hideHowToPlay} />
      </header>
      <main className="app__main app__main--home">
        <p>This is how you play charades</p>
      </main>
      <footer className="app__footer">
        <Button
          onClick={hideHowToPlay}
          type="secondary"
          className="button-secondary--min-width"
        >
          Cancel
        </Button>
      </footer>
    </>
  );
}

export default HowToPlay;
