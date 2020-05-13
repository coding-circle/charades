import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";

// TODO: load from env
const BASE_URL = "http://localhost:4001";

function App() {
  const [partyId, setPartyId] = useState(null);
  const [host, setHost] = useState(null);
  const [slugToJoin, setSlugToJoin] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const res = await axios.get(BASE_URL);
      console.log(res);
    };
    connect();
  }, []);

  useEffect(() => {
    if (partyId) {
      const socket = io(`${BASE_URL}/${partyId}`);
      socket.on("connect", () => {
        console.log("** socket connected");
      });
      socket.on("update", console.log);
    }
  }, [partyId]);

  const createParty = useCallback(async () => {
    const res = await axios.post("http://localhost:4001/api/party");
    console.log(res);

    const { data = {} } = res;
    const { slug } = data;
    setHost(true);
    setPartyId(slug);
  });

  const joinParty = useCallback(async () => {
    const res = await axios.put("http://localhost:4001/api/party", {
      playerName: "Andy",
      slug: slugToJoin,
    });

    console.log(res);
    const { data = {} } = res;
    const { slug } = data;
    setHost(false);
    setPartyId(slug);
  });

  return (
    <div className="App">
      <h1 style={{ margin: "20px" }}>Charades</h1>
      <h4 style={{ margin: "20px" }}>This is a charades app!</h4>
      {partyId ? (
        `${host ? "Created" : "Joined"} party ${partyId}`
      ) : (
        <frag>
          <button onClick={createParty}>Create Party</button>
          <button onClick={joinParty}>Join Party</button>{" "}
          <input
            type="text"
            onChange={(evt) => {
              setSlugToJoin(evt.target.value);
            }}
          />
        </frag>
      )}
      <br />
    </div>
  );
}

export default App;
