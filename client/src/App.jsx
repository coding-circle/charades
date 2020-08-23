import React, { useState, useEffect } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import Home from "./views/Home/Home";
import Party from "./views/Party/Party";
import Sandbox from "./views/Sandbox";
import api from "./utils/api";
import ReactGA from "react-ga";

const isDevelopment = process.env.NODE_ENV === "development";

function App() {
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

  const [currentView, setCurrentView] = useState("loading");
  const [party, setParty] = useState({});
  const [localStorage] = useLocalStorage("charades", {
    username: "",
    slug: "",
  });

  const setCurrentViewToHome = () => setCurrentView("home");
  const setCurrentViewToParty = () => setCurrentView("party");

  useEffect(() => {
    const loadSlug = async () => {
      const urlSlug = document.location.pathname.slice(1).toUpperCase();

      if (!urlSlug) {
        writeStorage("charades", {
          ...localStorage,
          slug: "",
        });
      } else {
        // if development and sandbox
        if (isDevelopment && urlSlug.toLowerCase() === "sandbox") {
          setCurrentView("sandbox");
          return;
        }

        if (urlSlug === localStorage.slug) {
          const party = await api.getParty({ slug: urlSlug });

          if (party && party.players.includes(localStorage.username)) {
            setParty(party);
            setCurrentView("party");
            return;
          }
        } else {
          writeStorage("charades", {
            ...localStorage,
            slug: urlSlug,
          });
        }
      }

      setCurrentView("home");
    };

    setTimeout(loadSlug, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const views = {
    home: (
      <Home
        slug={localStorage.slug}
        username={localStorage.username}
        setCurrentViewToParty={setCurrentViewToParty}
      />
    ),
    party: (
      <Party
        slug={localStorage.slug}
        username={localStorage.username}
        party={party}
        setCurrentViewToHome={setCurrentViewToHome}
      />
    ),
    // blank screen on inital load.
    // loading indicators used on join/create party
    loading: <div></div>,
    sandbox: <Sandbox />,
  };

  return <div id="app">{views[currentView]}</div>;
}

export default App;
