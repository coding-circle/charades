# Gameplay

The gameplay is derived from parsing the party object client side. This is to share some knowledge on how that parsing takes place.

## How to tell what phase game is in:

**pre-game lobby:**

```
games.length === 0;
```

**prompt-writing:**

```
games[games.length - 1].startTime === null;
```

**game-play:**

```
games[games.length - 1].startTime &&
games[games.length - 1].endTime === null;
```

**post-game lobby**

```
games[games.length - 1].endTime !== null;
```
