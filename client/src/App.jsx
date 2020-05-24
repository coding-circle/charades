import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import Home from "./views/Home";
import Game from "./views/Game";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [localStorage, setLocalStorage] = useLocalStorage("charades", {
    username: "",
    slug: "",
  });

  useEffect(() => {
    const UrlSlug = document.location.pathname.slice(1);

    if (!UrlSlug && !localStorage.slug) {
      setLocalStorage({
        ...localStorage,
        slug: "",
      });
      setCurrentView("home");
    }

    if ((!UrlSlug && localStorage.slug) || UrlSlug === localStorage.slug) {
      const party = false; // await getParty(localStorage.slug);

      if (party && party.players.includes(localStorage.username)) {
        return setCurrentView("game");
      }

      return setCurrentView("home");
    }

    if (
      (UrlSlug && !localStorage.slug) ||
      (UrlSlug && localStorage.slug && UrlSlug !== localStorage.slug)
    ) {
      setLocalStorage({
        ...localStorage,
        slug: UrlSlug,
      });

      setCurrentView("home");
    }
  }, []);

  const views = {
    home: <Home slug={localStorage.slug} username={localStorage.username} />,
    game: <Game slug={localStorage.slug} username={localStorage.username} />,
  };

  return views[currentView];
}

export default App;
