import socketIo from "socket.io";

export default class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.sockets = {};
  }

  create(partySlug, party) {
    if (!this.sockets[partySlug]) {
      const socket = this.io.of(`/${partySlug}`);
      this.sockets[partySlug] = socket;

      this.listeners(partySlug, party);

      return socket;
    }
    console.warn(
      `attempted to create socket ${partySlug} but it already exists`
    );
  }

  getSocket(partySlug) {
    if (this.sockets[partySlug]) {
      return this.sockets[partySlug];
    }

    console.warn(`unable to get socket ${partySlug}`);
  }

  destroySocket() {
    if (this.sockets[partySlug]) {
      delete this.sockets[partySlug];
      return true;
    }

    console.warn(
      `attempted to destroy socket ${partySlug} but it did not exists`
    );
  }

  listeners(partySlug) {
    this.sockets[partySlug].on("connection", (socket) => {
      console.log(this.sockets.length);
    });
  }

  broadcastParty(partySlug, party) {
    console.log(this.sockets.length);
    this.sockets[partySlug].emit("update", { party });
  }
}
