import { validationResult } from "express-validator";
import boundingBoxZap from "./constants/boundingBox.js";
import expressValidator from "express-validator";

const { query } = expressValidator;

export function logErro(mensagem) {
  const data = new Date().toISOString();
  console.log(`${mensagem} - ${data}`);
}

export function estaNaBoundingBox(imovel) {
  const { minLon, maxLon, minLat, maxLat } = boundingBoxZap;
  const { lon: lonImovel, lat: latImovel } =
    imovel.address.geoLocation.location;

  if (
    lonImovel >= minLon &&
    lonImovel <= maxLon &&
    latImovel >= minLat &&
    latimovel <= maxLat
  ) {
    return true;
  }
  return false;
}

export function paginacao(arrayImoveis, page, itens) {
  return arrayImoveis.slice((page - 1) * itens, page * itens);
}

export const respostaFormatada = (arrayImoveis, page, itens, totalItens) => ({
  pageNumber: page,
  pageSize: itens,
  totalCount: totalItens,
  listings: arrayImoveis,
});

export const verificaElegibilidadeGeral = (imovel) => {
  const { lon: lonImovel, lat: latImovel } =
    imovel.address.geoLocation.location;
  const { usableAreas } = imovel;
  return latImovel != 0 && lonImovel != 0 && usableAreas != 0;
};

export const valida = (validacoes) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validacoes.map((validacao) => validacao.run(req)));

      const erros = validationResult(req);
      if (erros.isEmpty()) {
        return next();
      }
      res.status(400).json({ erros: erros.array(), mensagem: "Bad request." });
    } catch (erro) {
      logErro(`Internal Server Error: ${erro}`);
      res.status(500).json({ mensagem: "Internal Server error." });
    }
  };
};
