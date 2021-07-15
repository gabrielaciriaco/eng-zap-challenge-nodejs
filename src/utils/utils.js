import { validationResult } from "express-validator";
import constants from "./constants/constants.js";
import expressValidator from "express-validator";

const { query } = expressValidator;

export function logErro(mensagem) {
  console.log(mensagem);
}

export function estaNaBoundingBox(imovel) {
  const { minLon, maxLon, minLat, maxLat } = constants.boundingBoxZap;
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

export const validaParametrosQuery = [
  query("page").isInt({ min: 1 }).toInt(),
  query("itens").isInt({ min: 1 }).toInt(),
];
