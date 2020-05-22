// import { PartyModel, createParty } from "./models/party.js";

// export default class AppManager {
//   constructor(socketService, dbService) {
//     this.socketService = socketService;
//   }

//   async createParty(hostName, settings) {
//     const party = await createParty(settings);
//     this.addPlayerToParty(hostName, party.slug);
//     const socket = this.socketService.create(party.slug);

//     socket.on("connect", (connection) => {
//       connection.emit("update");
//     });
//     return { slug: party.slug };
//   }

//   addPlayerToParty(playerName, partyId) {}

//   async getParties() {
//     const parties = await PartyModel.find();
//     return parties;
//   }
// }
