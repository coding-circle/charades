# Socket Events / Listeners

Sockets are handled via `socket.io`. They primarily used for "pointing" at users as well as for triggering updates. When users join a "party" they enter a socket room. Each party will have it's own socket.io "room"

## Party Connection

**Note:** I just copied this from other socket work I did but seems like reasonable practice for modularity within socket.io since all event listeners need to be inside the connection closure.

```
io.on('connection', (client) => {
  const { slug } = client.handshake.query;
  const room = slug;

  client.join(room);

  for (let event in clientEvents) {
    client.on(
      event,
      clientEvents[event].bind(null, { io, client, room })
    );
  }
});
```

## Events

All events emitted from client prefixed with `client.EVENT_NAME`.
All events emitted from server prefixed with `server.EVENT_NAME`.
This is to reduce confusion while developing as to where an event originated from.

### Pointing

Pointing at a user to indicate they guessed correct. Only current active actor can emit point event.

**Client:** `client.point`

**Server:** `server.point`

**Payload:**

```
{
  username: string,
}
```

**Actions:**

- server.point is emitted to all teammembers with the same payload. (or maybe it's simpler just to broadcast to the entire party).
- client will show a message indicating who is being pointed at.

---

### Update

This one i'm a bit unclear on. Is this called by the client after a response from server.

**Client:** `client.update`

**Server:** `server.update`

**Payload:**

```
{
  username: string,
}
```

**Actions:**

- when a user mutates data object and gets response back from server. emits client.update
- server.update is broadcast to members of party (except client who triggered).
- then they will a get request for updates party object.

---

**The Rest are TBD...**

This might be enough except for handling disconnect, reconnects, leaving, and joining. But there are built in reserved events for these.
