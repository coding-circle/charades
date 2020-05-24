import React from "react";
import SocketHOC from "../utils/SocketHOC";

// Logic for which game view and what what props are passed down is handled here.
function Party({ slug, username, party }) {
  console.log("party props: ", party);

  return (
    <main className="app_main">
      <h2 className="text__heading">{slug}</h2>
      <p>{username}</p>
    </main>
  );
}

export default SocketHOC(Party);
