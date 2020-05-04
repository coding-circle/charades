export default class SocketService {
  constructor(io) {
    this.io = io;
  }

  create = (socketId) => {
    return this.io.of(`/${socketId}`);
  }
}