// lobby with players
export const lobbyPhase = {
  slug: "xdgasd",
  host: "jacten",
  createdAt: 1588553102804,
  updateAt: 1588553102804,
  players: [
    "jacten",
    "chedgo",
    "andy",
    "anya",
    "james",
    "Big Daddy Ders",
    "bro-sauce",
  ],
  settings: {
    rotations: 2,
    turnDurationSeconds: 90,
    teamsCount: 2,
    autoStart: false,
  },
  games: [{}],
  prompts: [],
};

// prompt writing phase w/ prompts
export const promptPhase = {
  slug: "xdgasd",
  host: "jacten",
  createdAt: 1588553102804,
  updateAt: 1588553102804,
  players: [
    "jacten",
    "chedgo",
    "andy",
    "anya",
    "james",
    "Big Daddy Ders",
    "bro-sauce",
  ],
  settings: {
    rotations: 2,
    turnDurationSeconds: 90,
    teamsCount: 2,
    autoStart: false,
  },
  games: [
    {
      startTime: 1588553102804,
      endTime: 1588553102804,
      teams: [
        {
          teamName: "Team A",
          players: ["jacten", "chedgo", "andy", "anya"],
          playerIndex: 1,
          score: 1,
        },
        {
          teamName: "Team B",
          players: ["james", "Big Daddy Ders", "bro-sauce"],
          playerIndex: 1,
          score: 0,
        },
      ],
      totalTurns: 16,
      turns: [
        {
          startTime: 1588553102804,
          endTime: 1588553102804,
          teamIndex: 0,
          player: "jacten",
          author: "Big Daddy Ders",
          prompt: "Jackie Brown",
          success: true,
        },
        {
          startTime: 1588553103804,
          endTime: 1588553104804,
          teamIndex: 1,
          player: "james",
          author: "jacten",
          prompt: "Pulp Fiction",
          success: false,
        },
      ],
    },
  ],
  prompts: [
    { author: "jacten", prompt: "Taming of the Shrew" },
    { author: "chedgo", prompt: "Othello" },
    { author: "chedgo", prompt: "Star Wars" },
    { author: "andy", prompt: "Once Upon a Time in Hollywood" },
    { author: "andy", prompt: "Raging" },
    { author: "anya", prompt: "The Stranger" },
    { author: "anya", prompt: "Kill Bill" },
    { author: "james", prompt: "Inglorious Basterds" },
    { author: "james", prompt: "Do the Right Thing" },
    { author: "Big Daddy Ders", prompt: "Resevoir Dogs" },
  ],
};

// mid game
export const midGamePhase = {};

// one turn left in game
export const endGamePhase = {};

// post-game lobby
export const postGamePhase = {};
