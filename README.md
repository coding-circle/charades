# charades

A companion app for playing [charades](https://en.wikipedia.org/wiki/Charades)

## Inspiration

After attempting to play charades over zoom, we found the mechanisms to be difficult. Sharing clues was a process involving texting individual users. Keeping track of whose turn it was and who should send those clues was confusing.

Another problem, specific to video-conferencing is it was difficult for the actor to communicate with guessers when they have a correct partial answer.

This project aims to solve these problems and build a tool that can be used over video-conferencing or IRL (post covid-19).

## MVP Features

- create parties with unique access code
- join parties via unique access code / url link
- waiting room pre and post game
- clue writing phase
- automatic team creation
- settings modified by game host
- ability to leave and join parties mid game.
- score-keeping
- automatic clue distribution and timing

## Post-MVP Features

- pre-made clues
- team selection / drafting
- skipping difficult clues
- casual mode (no score, unlimited play, maybe no teams either)
- auth / with

## Tech Stack

- React
- Express
- Socket.io
- MongoDB (or other noSQL db)
- [BEM](http://getbem.com/naming/)

## Data Model

Party Object:

```
{
  partySlug: string,
  host: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  players: [
    usernames,
  ],
  settings: {
    rotations: number,
    turnDuration: number,
    teamNumber: number,
    autoStart: boolean,
  },
  games: [
    {
      startTime: timestamp;
      endTime:
      teams: [
        {
          teamName: string,
          players: string[],
          playerIndex: number,
          score: number,
        },
      ],
      rotation: number,
      turns: [
        {
          startTime: timestamp,
          author: string,
          clue: string,
          teamIndex: number,
          player: string,
          success: boolean,
        },
      ],
    },
    ...
  ],
  clues: [
    {
      author: string
      clue: string,
    },
  ],
}
```

Example:

```
{
  partySlug: "XL9T", // randomly generated. roomCode.
  host: "jacten",
  createdAt: 1588553102804,
  updatedAt: 1588553102804,
  players: [
    "jacten",
    "chedgo",
    "asim",
    "chelsea",
    "mick",
    "lady ash",
    "jerry",
  ],
  settings: {
    rotations: 0, // if 0 is "infinte game". A rotation is everyone taking a turn.
    turnDuration: 90,
    teamNumber: 2, // defaults to 2, number of teams.
    autoStart: true, // if true automatically starts a turn after preivous (with countdown). Otherwise the actor has a button to click when ready.
  },
  games: [
    {
      startTime: 1588553102804,
      endTime: 1588553102804,
      teams: [
        {
          teamName: "Turkey Team",
          players: [
            "lady ash",
            "asim",
            "mick",
            "chelsea",
          ],
          playerIndex: 0,
          score: 0,
        },
                {
          teamName: "Turkey Team",
          players: [
            "jerry",
            "jacten",
            "chedgo",
          ],
          playerIndex: 0,
          score: 0,
        },
      ],
      rotation: number,
      turns: [
        {
          startTime: 1588553102804,
          author: "lady ash",
          clue: "Bubba Gump Shrimp Co.",
          teamIndex: 0,
          player: "lady ash"
          success: true,
        },
        {
          startTime: 1588553102804,
          author: "jerry",
          clue: "Luigi's Mansion",
          teamIndex: 0,
          player: "lady ash"
          success: true,
        },
      ],
    },
    ...
  ],
  clues: [
    {
      author: "chedgo"
      clue: "Tuna Salad",
    },
    {
      author: "mick"
      clue: "Bald Eagle",
    },
  ],
}
```

## Contributions

As of now, the mentor's of coding-circle are going to build out a foundation for the app. But we will start making cards using github's project management features for mentee's to take.

If anyone want's to contribute prior to this step please reach out and we will find something you can do!
