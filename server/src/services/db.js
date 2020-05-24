import mongoose from "mongoose";

export default class DbService {
  constructor(URI) {
    if (URI) {
      mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } else {
      console.error("MONGO_URI environment variable not found!!");
    }
  }
}
