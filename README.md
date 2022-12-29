# Web Charades

A companion app for playing [charades](https://en.wikipedia.org/wiki/Charades)

## Inspiration

After attempting to play charades over zoom, we found the mechanisms to be difficult. Sharing prompts was a process involving texting individual users. Keeping track of whose turn it was and who should send those prompts was confusing.

Another problem, specific to video-conferencing is it was difficult for the actor to communicate with guessers when they have a correct partial answer.

This project aims to solve these problems and build a tool that can be used over video-conferencing or IRL (post covid-19).

## Tech Stack

- React
- Express
- Socket.io
- MongoDB (via Mongo Atlas)
- [BEM](http://getbem.com/naming/)

Server is hosted on a free heroku instance. Client is hosted by AWS S3 served via Cloudfront.

## Contributions

As of 2021 This project is official open source 🎉!

See list of issue and feel free to take any of the `good for beginner` issues. Any other issue can be taken after you are familar with the project, but scope may be broad so probably would need further instructions. Just take the card and ask any questions! :)

## Getting Started

### Connecting to MongoDB

To run this server, you have to connect to a MongoDB database. Your server will do this automatically once you've set the MONGO_URI environment variable.

Two options for getting a MONGO_URI for development:

1. (most recommended) Sign up for Mongo Atlas yourself and create a databse for yourself, find the URI by going through the 'connect' flow.
2. Run a local MongoDB instance using Docker Compose with the command `docker compose up`.
3. Run a local MongoDB instance and connect.

### Set up .env

Set your `MONGO_URI` evironment variable in a `.env` file inside `server/`. If you use Mongo Atlas, your `.env` will look like:

```
MONGO_URI="mongodb+srv://<username>:<password>@cluster0-cusns.mongodb.net/<database>?retryWrites=true&w=majority"
```

If you're using Docker Compose, set you `MONGO_URI` to:

```
MONGO_URI="mongodb://admin:password@localhost:27017?retryWrites=true&w=majority"
```

I put an example `.env` file in `.env.sample` feel free to `mv .env.sample .env` to get started.

### To Test

Testing is only on server for now. Tests use jest.

```
cd server
npm test
```
