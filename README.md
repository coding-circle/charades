# charades

A companion app for playing [charades](https://us02web.zoom.us/j/86762991790?pwd=bHEvUkw1K1djMUpqTlBUOWJVTDRrUT09)

## Inspiration

After attempting to play charades over zoom, we found the mechanisms to be difficult. Sharing clues was a process involving texting individual users. Keeping track of whose turn it was and who should send those clues was confusing.

Another problem, specific to video-conferencing is it was difficult for the actor to communicate with guessers when they have a correct partial answer.

This project aims to solve these problems and build a tool that can be used over video-conferencing or IRL (post covid-19).

## MVP Features

## Post-MVP Features

- pre-made clues for noobs
- allow users to choose
- skips?
- casual mode
- custom dictionary // userID with custom dictionary

## Tech Stack

- React
- Express
- Socket.io
- MongoDB (or other noSQL db)
- [BEM](http://getbem.com/naming/)

## Data Model

The Game Object

```
{
  gameSlug: string, // x90l
  host: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  players: [
    usernames,
  ],
  settings: {
    rotations: number, // infinite
    roundDuration: number, seconds
    teamNumber: number,
    autoStart: boolean // if game should automatically start vs waiting for actor to click start
  },
  games: [
    {
      startTime: timestamp;
      endTime:
      teams: [ // order teams go in is randomly chosen by this order.
        {
          teamName: "",
          players: [ // order is playing order randomly chosen.
            string // usernames
          ],
          playerIndex: number,
          score: number,
        },
      ],
      rotation: 0,
      rounds: [
        {
          startTime: timestamp,
          author: string,
          clue: string,
          teamIndex: number,
          success: boolean,
        },
      ],
    },
    ...
  ],
  clues: [
    {
      author: string // username
      clue: string,
    },
  ],
  results: [

  ],
}
```

## Contributions

As of now, the mentor's of coding-circle are going to build out a foundation for the app. But we will start making cards using github's project management features for mentee's to take.

If anyone want's to contribute prior to this step please reach out and we will find something you can do!
