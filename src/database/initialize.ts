import Mongoose, { Connection } from "mongoose";
import messages from "../utils/messages";

let database: Connection;

const connect = () => {
  const uri = process.env.MONGO_URL as string;
  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log(messages.databaseConnected);
  });

  database.on("error", () => {
    console.log(messages.errors.databaseNotConnected);
  });
};

const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};

export default {
  connect,
  disconnect,
};
