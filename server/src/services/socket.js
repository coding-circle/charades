import socketIo from "socket.io";

export default class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.sockets = {};
  }

  create(socketId) {
    if (!this.sockets[socketId]) {
      const socket = this.io.of(`/${socketId}`);
      this.sockets[socketId] = socket;
      return socket;
    }
    console.warn(`attempted to create socket ${socketId} but it already exists`);
  }

  getSocket(socketId) {
    if (this.sockets[socketId]) {
      return this.sockets[socketId];
    }
    console.warn(`unable to get socket ${socketId}`);
  }

  destroySocket() {
    if (this.sockets[socketId]) {
      delete this.sockets[socketId];
      return true;
    }
    console.warn(`attempted to destroy socket ${socketId} but it did not exists`);
  }
}