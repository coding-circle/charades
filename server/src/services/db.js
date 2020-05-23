import mongoose from "mongoose";

export const connectMongoose = (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default class DbService {
  constructor(URI) {
    if (URI) {
    } else {
      console.error("MONGO_URI environment variable not found!!");
    }
  }
}
