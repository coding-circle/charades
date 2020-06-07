import socketIo from "socket.io";

export default class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.sockets = {};
  }

  create(slug, party) {
    if (!this.sockets[slug]) {
      const socket = this.io.of(`/${slug}`);
      this.sockets[slug] = socket;

      this.listeners(slug, party);

      return socket;
    }
    console.warn(`attempted to create socket ${slug} but it already exists`);
  }

  getSocket(slug) {
    if (this.sockets[slug]) {
      return this.sockets[slug];
    }

    console.warn(`unable to get socket ${slug}`);
  }

  destroySocket() {
    if (this.sockets[slug]) {
      delete this.sockets[slug];
      return true;
    }

    console.warn(`attempted to destroy socket ${slug} but it did not exists`);
  }

  listeners(slug) {
    this.sockets[slug].on("connection", (socket) => {
      socket.on("point-at", (pointed) => {
        this.sockets[slug].emit("point-at", pointed);
      });
    });
  }

  broadcastParty(slug, party) {
    this.sockets[slug].emit("update", { party });
  }
}
