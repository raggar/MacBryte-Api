import express, { Response, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import messages from "./utils/messages";
import middlewares from "./middlewares";
import apiV1 from "./apiV1";

const app = express();

// middlwares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send(messages.hello);
});

app.use("/apiV1", apiV1);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
