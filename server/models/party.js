import { EventEmitter } from 'events';

export default class Party extends EventEmitter {
  constructor(settings) {
    super();
    this.state = {
      settings,
      players: [],
    }
  }

 addPlayer = (playerName) => {
   this.state.players.push(playerName)
   console.log(this.state);
   this.emit("update", this.state);
 }
}
