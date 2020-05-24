import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import Home from "./views/Home/Home";
import Party from "./views/Party";
import LoadingIndicator from "./components/LoadingIndicator";
import api from "./utils/api";

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
    const loadSlug = async () => {
      const UrlSlug = document.location.pathname.slice(1);

      if (!UrlSlug) {
        if (!localStorage.slug) {
          setLocalStorage({
            ...localStorage,
            slug: "",
          });
        } else {
          const remoteParty = await api.getParty({ slug: localStorage.slug });

          if (
            remoteParty &&
            remoteParty.players.includes(localStorage.username)
          ) {
            window.location.pathname = localStorage.slug;
            setParty(remoteParty);
            setCurrentView("party");
            return;
          }

          setLocalStorage({
            ...localStorage,
            slug: "",
          });
        }
      } else {
        if (UrlSlug === localStorage.slug) {
          const remoteParty = await api.getParty({ slug: localStorage.slug });

          if (
            remoteParty &&
            remoteParty.players.includes(localStorage.username)
          ) {
            setParty(remoteParty);
            setCurrentView("party");
            return;
          }
        } else {
          setLocalStorage({
            ...localStorage,
            slug: UrlSlug,
          });
        }
      }
      setCurrentView("home");
    };

    setTimeout(loadSlug, 1500);
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
  };

  return <div id="app">{views[currentView]}</div>;
}

export default App;
