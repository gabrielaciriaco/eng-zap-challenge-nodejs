import express from "express";

const routes = express.Router();

routes.get("/viva_real/imoveis", (req, res) => {});
routes.get("/zap/imoveis", (req, res) => {
  res.send("entrei");
});

export default routes;
