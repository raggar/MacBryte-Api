import app from "./app";
import process from "process";
import initialize from "./database/initialize";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  initialize.connect();
  console.log(`MacBryte Server listening at http://localhost:${PORT}`);
});
