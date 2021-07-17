import express from "express";
import cors from "cors";

import routes from "./config/routes.js";
import singleton from "./services/imoveisSingleton.js";
import config from "./config/config.js";

const app = express();
const imoveisSingleton = new singleton().getInstance();

app.use(cors());
app.use("/api/v1", routes);

const server = app.listen(config.porta, async () => {
  imoveisSingleton.carregarImoveis();
  console.log(`O servidor está rodando na porta: ${config.porta}`);
});

export default server;
