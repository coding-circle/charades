import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import Home from "./views/Home/Home";
import Game from "./views/Game";
import api from "./utils/api";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [localStorage, setLocalStorage] = useLocalStorage("charades", {
    username: "",
    slug: "",
  });

  const setCurrentViewToHome = () => setCurrentView("home");
  const setCurrentViewToGame = () => setCurrentView("game");

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
          const party = await api.getParty({ slug: localStorage.slug });

          if (party && party.players.includes(localStorage.username)) {
            window.location.pathname = localStorage.slug;
            setCurrentView("game");
            return;
          }

          setLocalStorage({
            ...localStorage,
            slug: "",
          });
        }
      } else {
        if (UrlSlug === localStorage.slug) {
          const party = await api.getParty({ slug: localStorage.slug });

          if (party && party.players.includes(localStorage.username)) {
            setCurrentView("game");
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
    loadSlug();
  }, []);

  const views = {
    home: (
      <Home
        slug={localStorage.slug}
        username={localStorage.username}
        setCurrentViewToGame={setCurrentViewToGame}
      />
    ),
    game: <Game slug={localStorage.slug} username={localStorage.username} />,
  };

  return views[currentView];
}

export default App;
