import express from "express";
import cors from "cors";

import routes from "./src/controllers/config/routes.js";
import imoveisSingleton from "./src/services/imoveisSingleton.js";
import config from "./src/config/config.js";

const app = express();
const imoveis = new imoveisSingleton().getInstance();

app.use(cors());
app.use("/api/v1", routes);

const index = app.listen(config.porta, async () => {
  imoveis.carregarImoveis();
  console.log(`O servidor está rodando na porta: ${config.porta}`);
});

export default index;
