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
                    score: 3,
                },
                {
                  teamName: "Silver Tiger Claw",
                  players: [
                      "bobanya",
                      "genji",
                      "millie",
                  ],
                  playerIndex: 2,
                  score: 1,
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
                    teamIndex: 1,
                    player: "bobanya",
                    author: "jilly",
                    prompt: "aquaphor",
                    success: true,
                },
                {
                    startTime: 1588557102804,
                    endTime: 1588558102804,
                    teamIndex: 0,
                    player: "rosa",
                    author: "genji",
                    prompt: "snail eating a cucumber",
                    success: true,
                },
                {
                    startTime: 1588558102804,
                    endTime: 1588559102804,
                    teamIndex: 1,
                    player: "genji",
                    author: "rosa",
                    prompt: "five star wings",
                    success: false,
                },
                {
                    startTime: 1588558102804,
                    endTime: 1588559102804,
                    teamIndex: 0,
                    player: "heinrich",
                    author: "millie",
                    prompt: "i'm a lil bitch",
                    success: true,
                }
            ]
        }
    ],
    prompts: [
        {
            author: "bobanya",
            prompt: "lip light"
        },
        {
            author: "genji",
            prompt: "star wards: the last jedi"
        },
        {
            author: "millie",
            prompt: "plush baby legs"
        },
        {
            author: "jilly",
            prompt: "smoking is cool kids"
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
export const endGamePhase = {
    {
        slug: "YU12BAD", // randomly generated. roomCode.
        host: "catchi",
        createdAt: 1588553102804,
        updatedAt: 1588553102804,
        players: [
          "catchi",
          "chedgo",
          "marcel",
          "watermelon jim",
          "undead stalin",
          "barbunia",
          "mallard filmore",
        ],
        settings: {
          rotations: 2,
          turnDurationSeconds: 90,
          teamsCount: 2, // defaults to 2, number of teams.
          autoStart: true, // if true automatically starts a turn after preivous (with countdown). Otherwise the actor has a button to click when ready.
        },
        games: [
          {
            startTime: 1588553102804,
            endTime: 1588553102804,
            teams: [
              {
                teamName: "Flying Fucks",
                players: [
                  "catchi",
                  "marcel",
                  "undead stalin",
                  "mallard filmore",
                ],
                playerIndex: 3,
                score: 3,
              },
              {
                teamName: "Corporate Shills",
                players: [
                  "chedgo",
                  "watermelon jim",
                  "barbunia",
                ],
                playerIndex: 1,
                score: 5,
              },
            ],
            totalTurns: 16,
            turns: [
              {
                startTime: 1588553102804,
                endTime: 1588553102804,
                author: "catchi",
                prompt: "jeremy bearimy",
                teamIndex: 1,
                player: "chedgo",
                success: false,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804,
                author: "chedgo",
                prompt: "corn dog bread",
                teamIndex: 0,
                player: "catchi",
                success: false,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "catchi",
                prompt: "banana pentagram",
                teamIndex: 1,
                player: "watermelon jim",
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "barbunia",
                prompt: "cream of wheat",
                teamIndex: 0,
                player: "marcel"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "marcel",
                prompt: "balding eagle",
                teamIndex: 1,
                player: "barbunia"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "chedgo",
                prompt: "orange you glad yer dead",
                teamIndex: 0,
                player: "undead stalin"
                success: false,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "marcel",
                prompt: "deflowering cactus",
                teamIndex: 1,
                player: "chedgo"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "watermelon jim",
                prompt: "imaginary number",
                teamIndex: 0,
                player: "mallard filmore"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "undead stalin",
                prompt: "laserdisk copy of terminator",
                teamIndex: 1,
                player: "watermelon jim"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "barbunia",
                prompt: "self check-out",
                teamIndex: 0,
                player: "catchi"
                success: false,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "mallard filmore",
                prompt: "moby dick tracy",
                teamIndex: 1,
                player: "barbunia"
                success: false,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "watermelon jim",
                prompt: "horchata latte",
                teamIndex: 0,
                player: "marcel"
                success: true,
              },
              {
                startTime: 1588553102804,
                endTime: 1588553102804
                author: "undead stalin",
                prompt: "perestroika",
                teamIndex: 1,
                player: "chedgo"
                success: true,
              },
            ],
          },
        ],
        prompts: [
        
          
          {
            author: "mallard filmore"
            prompt: "typewriter animation in powerpoint",
          }
        ],
      }
};

// post-game lobby
export const postGamePhase = {};
