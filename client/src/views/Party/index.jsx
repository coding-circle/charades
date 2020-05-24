import React, { useEffect } from "react";
import SocketHOC from "../../utils/SocketHOC";

import WaitingRoom from "./WaitingRoom";

// Logic for which game view and what what props are passed down is handled here.
function Party({ slug, username, party }) {
  useEffect(() => {}, [party]);

  return <WaitingRoom party={party} />;
}

export default SocketHOC(Party);
