import singleton from "./imoveisSingleton.js";
import {
  estaNaBoundingBox,
  paginacao,
  respostaFormatada,
  verificaElegibilidadeGeral,
  logErro,
} from "../utils/utils.js";
import constants from "../utils/constants/constants.js";

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

const verificaElegibilidadeImovelZap = (imovel) => {
  try {
    let estaElegivel = false;
    if (imovel.pricingInfos.businessType == "SALE") {
      estaElegivel = verificaRequisitosVendaZap(imovel);
    } else if (imovel.pricingInfos.businessType == "RENTAL") {
      estaElegivel = verificaRequisitosAluguelZap(imovel.pricingInfos.price);
    }

    return estaElegivel && verificaElegibilidadeGeral(imovel);
  } catch (erro) {
    logErro(`Erro ao verificar elegibilidade imovel zap: ${erro}`);
  }
};

const verificaRequisitosVendaZap = (imovel) => {
  const { usableAreas } = imovel;
  const { price } = imovel.pricingInfos;
  const { minUsableArea, minValorVenda } = constants.zap;
  const elegibilidadeValorMetroQuadrado = usableAreas > minUsableArea;
  let elegibilidadeValorImovel = false;
  if (estaNaBoundingBox(imovel)) {
    elegibilidadeValorImovel = price >= 0.9 * minValorVenda;
  } else {
    elegibilidadeValorImovel = price >= minValorVenda;
  }
  return elegibilidadeValorMetroQuadrado && elegibilidadeValorImovel;
};

const verificaRequisitosAluguelZap = (preco) => {
  return Number(preco) >= constants.zap.minValorAluguel;
};
