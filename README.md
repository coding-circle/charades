# Web Charades

A companion app for playing [charades](https://en.wikipedia.org/wiki/Charades)

## Connecting to MongoDB

To run this server, you have to connect to a MongoDB database. Your server will do this automatically once you've set the MONGO_URI environment variable.

You have at least three options for getting a MONGO_URI for development:

- (Easiest) Slack Andy and ask for your own database on his Mongo Atlas account, he'll send you a URI
- (Easy) Sign up for Mongo Atlas yourself and create a databse for yourself, find the URI by going through the 'connect' flow
- (Probably Easy) Run MongoDB on your machine locally, figure out your own URI

### Set up .env

Set your `MONGO_URI` evironment variable in a `.env` file inside `server/`. If you use Mongo Atlas, your `.env` will look like:

```
MONGO_URI="mongodb+srv://<username>:<password>@cluster0-cusns.mongodb.net/<database>?retryWrites=true&w=majority"
```

I put an example `.env` file in `.env.sample` feel free to `mv .env.sample .env` to get started.

## To Test

Testing is only on server for now. Tests use jest.

```
cd server
npm test
```

## Inspiration

After attempting to play charades over zoom, we found the mechanisms to be difficult. Sharing prompts was a process involving texting individual users. Keeping track of whose turn it was and who should send those prompts was confusing.

Another problem, specific to video-conferencing is it was difficult for the actor to communicate with guessers when they have a correct partial answer.

This project aims to solve these problems and build a tool that can be used over video-conferencing or IRL (post covid-19).

## MVP Features

- create parties with unique access code
- join parties via unique access code / url link
- waiting room pre and post game
- prompt writing phase
- automatic team creation
- settings modified by game host
- ability to leave and join parties mid game.
- score-keeping
- automatic prompt distribution and timing

## Post-MVP Features

- pre-made prompts
- team selection / drafting
- skipping difficult prompts
- casual mode (no score, unlimited play, maybe no teams either)
- auth / with

## Tech Stack

- React
- Express
- Socket.io
- MongoDB (or other noSQL db)
- [BEM](http://getbem.com/naming/)

## Data Model

## Contributions

As of now, the mentor's of coding-circle are going to build out a foundation for the app. But we will start making cards using github's project management features for mentee's to take.

If anyone want's to contribute prior to this step please reach out and we will find something you can do!
