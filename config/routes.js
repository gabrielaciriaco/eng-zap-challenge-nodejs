import express from "express";

import { buscarImoveisVivaReal } from "../controllers/vivaRealController.js";
import { buscarImoveisZap } from "../controllers/zapController.js";
import { validacoesPaginacao } from "../validators/validators.js";
import { valida } from "../utils/utils.js";

const routes = express.Router();

routes.get(
  "/viva_real/imoveis",
  valida(validacoesPaginacao),
  buscarImoveisVivaReal
);

routes.get("/zap/imoveis", valida(validacoesPaginacao), buscarImoveisZap);

export default routes;
