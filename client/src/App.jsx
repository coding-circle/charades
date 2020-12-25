import React, { useState, useEffect } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import Home from "./views/Home/Home";
import Party from "./views/Party/Party";
import Sandbox from "./views/Sandbox";
import api from "./utils/api";
import ReactGA from "react-ga";

const isDevelopment = process.env.NODE_ENV === "development";

function App() {
  // state
  const [currentView, setCurrentView] = useState("loading");
  const [party, setParty] = useState();
  const [username, setUsername] = useState("");
  const [slug, setSlug] = useState("");
  const [localStorage] = useLocalStorage("charades", {
    username: "",
    slug: "",
  });

  const urlSlug = document.location.pathname.slice(1).toUpperCase();

  // event handlers
  const handleJoinParty = (party, username) => {
    setParty(party);
    setUsername(username);
    setSlug(party.slug);

    writeStorage("charades", {
      username,
      slug: party.slug,
    });

    window.history.pushState(null, "", party.slug);

    setCurrentView("party");
  };

  // effects
  // google analytics
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
      titleCase: false,
      gaOptions: {
        userId: 173896885,
        siteSpeedSampleRate: 100,
      },
    });

    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // initialize
  // pull username from localStorage
  useEffect(() => {
    if (!username && localStorage.username) {
      setUsername(localStorage.username);
    }

    if (!localStorage.username) {
      setCurrentView("home");
    }
  }, [username, localStorage.username]);

  // pull slug from url
  useEffect(() => {
    if (!slug && urlSlug) {
      setSlug(urlSlug);
    }

    if (!urlSlug && currentView !== "home") {
      setCurrentView("home");
    }
  }, [slug]);

  // update slug in localStorage
  useEffect(() => {
    if (urlSlug && urlSlug !== localStorage.slug) {
      writeStorage("charades", {
        ...localStorage,
        slug: urlSlug,
      });
    }
  }, [slug, localStorage]);

  useEffect(() => {
    const loadSlug = async () => {
      if (!!party || !urlSlug) {
        return;
      }

      // if development and sandbox
      if (isDevelopment && urlSlug.toLowerCase() === "sandbox") {
        setCurrentView("sandbox");
        return;
      }

      const remoteParty = await api.getParty({ slug: urlSlug });

      console.log(remoteParty, username);

      if (remoteParty && remoteParty.players.includes(username)) {
        setParty(remoteParty);
        setCurrentView("party");
        return;
      } else if (currentView !== "home") {
        console.log(2222);
        // setCurrentView("home");
      }
    };

    loadSlug();
  }, [username, currentView, party]);

  const views = {
    home: (
      <Home slug={slug} username={username} onJoinParty={handleJoinParty} />
    ),
    party: <Party slug={slug} username={username} party={party} />,
    // blank screen on inital load.
    // loading indicators used on join/create party
    loading: <div></div>,
    sandbox: <Sandbox />,
  };

  return <div id="app">{views[currentView]}</div>;
}

export default App;
