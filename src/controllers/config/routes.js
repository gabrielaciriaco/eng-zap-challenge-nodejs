import express from "express";

import { buscarImoveisVivaReal } from "../vivaRealController.js";
import { buscarImoveisZap } from "../zapController.js";
import { validaRequisicao } from "../../middlewares/middlewares.js";
import { validaParametrosQuery } from "../../utils/utils.js";

const routes = express.Router();

// @route GET
// @desc retorna a lista de imóveis Viva Real válidos
// @acess Public
routes.get(
  "/viva_real/imoveis",
  validaParametrosQuery,
  validaRequisicao(buscarImoveisVivaReal)
);

// @route GET
// @desc retorna a lista de imóveis Zap válidos
// @acess Public
routes.get(
  "/zap/imoveis",
  validaParametrosQuery,
  validaRequisicao(buscarImoveisZap)
);

export default routes;
