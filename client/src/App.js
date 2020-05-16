import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";

// TODO: load from env
const BASE_URL = "http://localhost:4001";

function App() {
  const [partySlug, setPartySlug] = useState(null);
  const [slugToJoin, setSlugToJoin] = useState(null);

  const [host, setHost] = useState(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const connect = async () => {
      const res = await axios.get(BASE_URL);
      console.log(res);
    };
    connect();
  }, []);

  useEffect(() => {
    if (partySlug) {
      const socket = io(`${BASE_URL}/${partySlug}`);
      socket.on("connect", () => {
        console.log("** socket connected");
      });
      socket.on("update", console.log);
    }
  }, [partySlug]);

  const createParty = useCallback(async () => {
    const res = await axios.post("http://localhost:4001/api/party");

    const { data = {} } = res;
    const { slug } = data;
    setHost(true);
    setPartySlug(slug);
  });

  const joinParty = useCallback(async () => {
    const res = await axios.put(
      `http://localhost:4001/api/party/${slugToJoin}`,
      {
        username: "Andy",
      }
    );

    console.log(res);
    const { data = {} } = res;
    const { slug } = data;
    setHost(false);
    setPartySlug(slug);
  });

  const addPrompt = async () => {
    const res = await axios.post(
      `http://localhost:4001/api/party/${partySlug}/prompt`,
      {
        author: "Andy",
        prompt,
      }
    );

    console.log("response after adding prompt: ", res);
  };

  return (
    <div className="App">
      <h1 style={{ margin: "20px" }}>Charades</h1>
      <h4 style={{ margin: "20px" }}>This is a charades app!</h4>
      {partySlug ? (
        <div>
          `${host ? "Created" : "Joined"} party ${partySlug}`
          <button onClick={addPrompt}>Add Prompt</button>
          <input
            type="text"
            onChange={(evt) => {
              setPrompt(evt.target.value);
            }}
          />
        </div>
      ) : (
        <div>
          <button onClick={createParty}>Create Party</button>
          <button onClick={joinParty}>Join Party</button>{" "}
          <input
            type="text"
            onChange={(evt) => {
              setSlugToJoin(evt.target.value);
            }}
          />
        </div>
      )}
      <br />
    </div>
  );
}

export default App;
