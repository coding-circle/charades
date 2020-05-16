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
  games: [],
  prompts: [
    { author: "jacten", prompt: "Taming of the Shrew" },
    { author: "jacten", prompt: "Pulp Fiction" },
    { author: "chedgo", prompt: "Othello" },
    { author: "chedgo", prompt: "Star Wars" },
    { author: "andy", prompt: "Once Upon a Time in Hollywood" },
    { author: "andy", prompt: "Raging" },
    { author: "anya", prompt: "The Stranger" },
    { author: "anya", prompt: "Kill Bill" },
    { author: "james", prompt: "Inglorious Basterds" },
    { author: "james", prompt: "Do the Right Thing" },
    { author: "Big Daddy Ders", prompt: "Jackie Brown" },
    { author: "Big Daddy Ders", prompt: "Resevoir Dogs" },
  ],
};

// mid game
export const midGamePhase = {
  slug: "trouble-maker",
    host: "bobanya",
    createdAt: 1588553102804,
    updatedAt: 1588553102804,
    players: [
        "bobanya",
        "genji",
        "millie",
        "jilly",
        "rosa",
        "heinrich"
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
                {
                    teamName: "Booty Shakers",
                    players: [
                        "jilly",
                        "rosa",
                        "heinrich",
                    ],
                    playerIndex: 0,
                    score: 2,
                },
                {
                  teamName: "Silver Tiger Claw",
                  players: [
                      "bobanya",
                      "genji",
                      "millie",
                  ],
                  playerIndex: 0,
                  score: 1
              },
            ],
            totalTurns: 12,
            turns: [
                {
                    startTime: 1588553102804,
                    endTime: 1588554102804,
                    teamIndex: 0,
                    player: "jilly",
                    author: "bobanya",
                    prompt: "car jacking",
                    success: true,
                },
                {
                    startTime: 1588555102804,
                    endTime: 1588556102804,
                    author: "jilly",
                    prompt: "snail bitch",
                    teamIndex: 0,
                    player: "bobanya",
                    success: true,
                },
                {
                    startTime: 1588557102804,
                    endTime: 1588558102804,
                    author: "genji",
                    prompt: "snail bitch",
                    teamIndex: 0,
                    player: "rosa",
                    success: true,
                },
                {
                    startTime: 1588558102804,
                    endTime: 1588559102804,
                    author: "rosa",
                    prompt: "five star wings"
                    teamIndex: 0,
                    player: "genji",
                    success: false,
                },
            ]
        }
    ],
    prompts: [
        {
            author: "bobanya",
            prompt: "car jacking"
        },
        {
            author: "bobanya",
            prompt: "lip light"
        },
        {
            author: "genji",
            prompt: "snail bitch"
        },
        {
            author: "genji",
            prompt: "star wards: the last jedi"
        },
        {
            author: "millie",
            prompt: "i'm a lil bitch"
        },
        {
            author: "millie",
            prompt: "plush baby legs"
        },
        {
            author: "jilly",
            prompt: "aquaphor"
        },
        {
            author: "jilly",
            prompt: "smoking is cool kids"
        },
        {
            author: "rosa",
            prompt: "five star wings"
        },
        {
            author: "rosa",
            prompt: "smoothie hoochie"
        },
        {
            author: "heinrich",
            prompt: "gloop gloop gloop"
        },
        {
            author: "heinrich",
            prompt: "mousie go bye bye"
        }
    ]

};

// one turn left in game
export const endGamePhase = {};

// post-game lobby
export const postGamePhase = {};
