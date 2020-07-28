import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import Home from "./views/Home/Home";
import Party from "./views/Party/Party";
import Sandbox from "./views/Sandbox";
import LoadingIndicator from "./components/LoadingIndicator";
import api from "./utils/api";
import ReactGa from 'react-ga';

const isDevelopment = process.env.NODE_ENV === "development";

function App() {
  const [currentView, setCurrentView] = useState("loading");
  const [party, setParty] = useState({});
  const [localStorage, setLocalStorage] = useLocalStorage("charades", {
    username: "",
    slug: "",
  });

  const setCurrentViewToHome = () => setCurrentView("home");
  const setCurrentViewToParty = () => setCurrentView("party");

  useEffect(() => {
    ReactGa.initialize('G-BCL6Z3PLF5')
    ReactGa.pageview(window.location.pathname)

    const loadSlug = async () => {
      const urlSlug = document.location.pathname.slice(1).toUpperCase();

      if (!urlSlug) {
        setLocalStorage({
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
          const party = await api.getParty({ slug: localStorage.slug });

          if (party && party.players.includes(localStorage.username)) {
            setParty(party);
            setCurrentView("party");
            return;
          }
        } else {
          setLocalStorage({
            ...localStorage,
            slug: urlSlug,
          });
        }
      }
      setCurrentView("home");
    };

    // forces loading screen to show at least 500 ms
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
    loading: <LoadingIndicator />,
    sandbox: <Sandbox />,
  };

  return <div id="app">{views[currentView]}</div>;
}

export default App;
