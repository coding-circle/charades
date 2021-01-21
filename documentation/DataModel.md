# Data Model

Each party is an object. It can have multiple "games" in a party. This whole object is passed from server to client and the client parses the object to know what part of the game it is. This party is updated via websocket connection.

#### Party Object:

```
{
  slug: string,
  host: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  players: string[], // username_uuid
  settings: {
    rotations: number,
    turnDurationSeconds: number,
    teamsCount: number,
  },
  games: [
    {
      startTime: timestamp;
      endTime: timestamp,
      teams: [
        {
          teamName: string,
          teamColor: string,
          teamPlayers: string[],
          playerIndex: number,
          score: number,
        },
      ],
      totalTurns: number,
      turns: [
        {
          startTime: timestamp,
          endTime: timestamp,
          author: string,
          prompt: string,
          teamIndex: number,
          player: string,
          success: boolean,
        },
      ],
    },
    ...
  ],
  prompts: [
    {
      author: string
      prompt: string,
    },
  ],
}
```

#### Example:

```
{
  slug: "XL9T", // randomly generated. roomCode.
  host: "jacten_TRC030",
  createdAt: 1588553102804,
  updatedAt: 1588553102804,
  players: [
    "jacten_TRC030",
    "chedgo_FIF301",
    "asim_FJE919",
    "chelsea_FJF911",
    "mick_FDO131",
    "lady ash_IFK310",
    "jerry_FJF010",
  ],
  settings: {
    rotations: 2,
    turnDurationSeconds: 90,
    teamsCount: 2, // defaults to 2, number of teams.
  },
  games: [
    {
      startTime: 1588553102804,
      endTime: 1588553102804,
      teams: [
        {
          teamName: "Turkey Team",
          players: [
            "lady ash_IFK310",
            "asim_FJE919",
            "mick_FDO131",
            "chelsea_FJF911",
          ],
          playerIndex: 0,
          score: 0,
        },
        {
          teamName: "Turkey Team",
          players: [
            "jerry_FJF010",
            "jacten_TRC030",
            "chedgo_FIF301",
          ],
          teamColor: "hsl(${hue}, 100%, 75%)"
          playerIndex: 0,
          score: 0,
        },
      ],
      totalTurns: 16,
      turns: [
        {
          startTime: 1588553102804,
          endTime: 1588553102804
          author: "lady ash_IFK310",
          prompt: "Bubba Gump Shrimp Co.",
          teamIndex: 0,
          player: "lady ash_IFK310"
          success: true,
        },
        {
          startTime: 1588553102804,
          endTime: 1588553102804,
          author: "jerry_FJF010",
          prompt: "Luigi's Mansion",
          teamIndex: 0,
          player: "lady ash_IFK310"
          success: true,
        },
      ],
    },
  ],
 prompts: [
    {
      author: "chedgo_FIF301"
      prompt: "Tuna Salad",
    },
    {
      author: "mick_FDO131"
      prompt: "Bald Eagle",
    },
  ],
}
```
