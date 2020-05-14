# Rest API Endpoints

All RestAPI endpoints prefixed with: `/api/`

### Create Party

**URL:** `/party/create`

**Method:** `POST`

**Data Params:**

```
{
  host: string,
  settings: {party
    rotations?: number,
    turnDuration?: number,
    teamsCount?: number,
    autoStart?: boolean,
  }
}
```

**Response:** Party Object

**Server Actions:**

- Create Party Object
- Create Socket Room for party

---

### Join Party

**URL:** `/party/:slug`

**Method:** `PUT`

**Data Params:**

```
{
  username: string,
}
```

**Response:** Party Object

**Server Actions:**

- Add username to party object
- If game is in progress joins team with least people.
- emits 'update' to other clients via socket

---

### Get Party Object

**URL:** `/party/:slug`

**Method:** `GET`

**Data Params:**

**Response:** Party Object

**Notes:** This is called by every client as a response to socket update listener.

---

### Create Game

**URL:** `/party/:slug/game/create`

**Method:** `POST`

**Data Params:**

**Response:** Party Object

**Notes:** Moves from lobby to prompt-writing phase.

**Server Actions:**

- Generates new game object with generated teams.
- emits 'update' to other clients via socket

---

### Add Prompt

**URL:** `/party/:slug/prompt`

**Method:** `POST`

**Data Params:**

```
{
  author: string
  prompt: string,
},
```

**Response:** Party Object

**Notes:**

**Server Actions:**

- emits 'update' to other clients via socket

---

### Start Game

**URL:** `/party/:slug/game/start`

**Method:** `PUT`

**Data Params:**

**Response:** Party Object

**Notes:** Moves from prompt-writing to game-play phase.

**Server Actions:**

- Sets startTime on game.
- removes a prompt from prompts array
- creates turn object in turn array
- emits 'update' to other clients via socket

---

### Start Turn

**URL:** `/party/:slug/turn/start`

**Method:** `PUT`

**Data Params:**

**Response:** Party Object

**Notes:** When an actor clicks ready.

**Server Actions:**

- Sets startTime on turn as a future point.
- emits 'update' to other clients via socket

---

### End Turn

**URL:** `/party/:slug/turn/end`

**Method:** `PUT`

**Data Params:**

```
{
  success: boolean,
}
```

**Response:** Party Object

**Notes:** Ends turn and submits result. If no turns left, ends game.

**Server Actions:**

- Sets endTime and success on turn
- Updates overall scores
- if more turns left
  - removes prompt from prompts array
  - creates turn object in turns array
- else
  - adds endTime to game object.
  - calculates final scores for more in depth scoreboard / stats
- emits 'update' to other clients via socket

---

### Rename Team

**URL:** `/party/:slug/rename`

**Method:** `PUT`

**Data Params:**

```
{
  teamIndex: number,
  teamName: string,
}
```

**Response:** Party Object

**Notes:** Can only rename your own team

**Server Actions:**

- updates team object
- emits 'update' to other clients via socket

---

### Update Party Settings

**URL:** `/party/:slug/settings`

**Method:** `PUT`

**Data Params:**

```
{
  rotations?: number,
  turnDuration?: number,
  teamsCount?: number,
  autoStart?: boolean,
}
```

**Response:** Party Object

**Notes:** Only available in pre/post-game lobby

**Server Actions:**

- updates party object
- emits 'update' to other clients via socket

---

### Leave Party

**URL:** `/party/:slug/leave`

**Method:** `DELETE`

**Data Params:**

```
{
  username: string
}
```

**Response:** Party Object

**Notes:** Perhaps this is unnecessary and will just be handled via socket. Otherwise we have to build UI for leaving game.

**Server Actions:**

- removes username from players / team array
- if host
  - randomly reassign host
- emits 'update' to other clients via socket
