import { PartyModel, makeParty } from "./models/party.js";

export default class AppManager {
  constructor(socketService, dbService) {
    this.socketService = socketService;
  }

  async createParty(hostName, settings) {
    const party = await makeParty(settings);
    this.addPlayerToParty(hostName, party.partySlug)
    const socket = this.socketService.create(party.partySlug);
  
    socket.on('connect', (connection) => {
      connection.emit('update');
    }); 
    return { slug: party.partySlug };
  }

  addPlayerToParty(playerName, partyId) {

  }

  async getParties() {
    const parties = await PartyModel.find();
    return parties;
  }

}

