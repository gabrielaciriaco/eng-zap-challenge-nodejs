import singleton from "./imoveisSingleton.js";
import {
  estaNaBoundingBox,
  paginacao,
  respostaFormatada,
  verificaElegibilidadeGeral,
  logErro,
} from "../utils/utils.js";
import zap from "../utils/constants/zap.js";

const imoveisSingleton = new singleton().getInstance();

export const buscarImoveisZapService = (page, itens) => {
  const imoveis = imoveisSingleton.imoveis;
  const zapImoveis = imoveis.filter((imovel) => {
    return verificaElegibilidadeImovelZap(imovel);
  });

  const arrayPaginado = paginacao(zapImoveis, page, itens);
  const response = respostaFormatada(
    arrayPaginado,
    page,
    itens,
    zapImoveis.length
  );
  return response;
};

const verificaRequisitosVendaZap = (imovel) => {
  const { usableAreas } = imovel;
  const { price } = imovel.pricingInfos;
  const { minUsableArea, minValorVenda } = zap;
  const elegibilidadeValorMetroQuadrado = usableAreas > minUsableArea;
  if (estaNaBoundingBox(imovel)) {
    return price >= 0.9 * minValorVenda && elegibilidadeValorMetroQuadrado;
  }
  return price >= minValorVenda && elegibilidadeValorMetroQuadrado;
};

const verificaRequisitosAluguelZap = ({ pricingInfos }) =>
  Number(pricingInfos.price) >= zap.minValorAluguel;

const verificadorBusinessType = {
  SALE: verificaRequisitosVendaZap,
  RENTAL: verificaRequisitosAluguelZap,
};

const verificaElegibilidadeImovelZap = (imovel) => {
  const { businessType } = imovel.pricingInfos;
  const elegibilidadeGeral = verificaElegibilidadeGeral(imovel);
  const verificaRequisitos =
    verificadorBusinessType[businessType] || (() => false);
  return elegibilidadeGeral && verificaRequisitos(imovel);
};
