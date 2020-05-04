import Party from "./models/party.js";

export default class AppManager {
  constructor(socketService) {
    this.socketService = socketService;
    this.parties = {}; // storage object for accessing parties
    this.sockets = {}; // storage object for accessing sockets
    this.nextAvailablePartyId = 0; // TODO: better way of generating party ids
  }

  /* MARK: party logic */
  createParty = (hostName, settings) => {
    // create a new party and socket
    const partyId = this.getNextAvailablePartyId();
    const party = new Party(settings);
    const socket = this.socketService.create(partyId);
  
    // initialize events for socket and party
    socket.on('connect', (connection) => {
      party.on("update", (data) => connection.emit("update", data));
      connection.on("event from client", () => console.log("handle the event"));

      // add the player to the party once the socket is established
      party.addPlayer(hostName);
    });

    // save a reference to the new party and return its initial state
    this.parties[partyId] = party;
    this.sockets[partyId] = socket;
    return { partyId };
  }

  addPlayerToParty = (playerName, partyId) => {
    // check for existence of the party
    if (this.parties[partyId]) {
      // add player to party and return its update state
      party.addPlayer(playerName);
    }
  }

  deleteParty = (partyId) => {
    delete this.parties[partyId];
  };

  /* MARK: internals */
  getNextAvailablePartyId = () => {
    // TODO: better way of generating party ids
    this.nextAvailablePartyId += 1;
    return this.nextAvailablePartyId;
  }

}

