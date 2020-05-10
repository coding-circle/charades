import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import io from 'socket.io-client';

// TODO: load from env
const BASE_URL = "http://localhost:4001";

function App() {
  const [partyId, setPartyId] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const res = await axios.get(BASE_URL);
      console.log(res)
    };
    connect();
  }, []);

  useEffect(() => {
    if (partyId) {
      const socket = io(`${BASE_URL}/${partyId}`);
      socket.on("connect", () => {
        console.log("** socket connected")
      });
      socket.on("update", console.log)
    }
  }, [partyId]);

  const createParty = useCallback(() => {
    const makeRequest = async () => {
      const res = await axios.post("http://localhost:4001/parties");
      console.log(res)
  
      const { data = {} } = res;
      const { slug } = data;
      setPartyId(slug);
    }

    makeRequest();
  });

  return (
    <div className="App">
      <h1 style={{ margin: "20px" }}>Charades</h1>
      <h4 style={{ margin: "20px" }}>This is a charades app!</h4>
      {
        partyId
          ? `created party ${partyId}`
          : <button onClick={ createParty }>Create Party</button>
      }
      <br/>
      { JSON.stringify(partyId)}
    </div>
  );
}

export default App;
