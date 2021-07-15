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

export const buscarImoveisVivaRealService = (page, itens) => {
  const imoveis = imoveisSingleton.imoveis;
  const vivaRealImoveis = imoveis.filter((imovel) => {
    return verificaElegibilidadeImovelVivaReal(imovel);
  });

  const arrayPaginado = paginacao(vivaRealImoveis, page, itens);
  const response = respostaFormatada(
    arrayPaginado,
    page,
    itens,
    vivaRealImoveis.length
  );
  return response;
};

const verificaElegibilidadeImovelVivaReal = (imovel) => {
  try {
    let estaElegivel = false;
    if (imovel.pricingInfos.businessType == "SALE") {
      estaElegivel = verificaRequisitosVendaVivaReal(imovel.pricingInfos.price);
    } else if (imovel.pricingInfos.businessType == "RENTAL") {
      estaElegivel = verificaRequisitosAluguelVivaReal(imovel);
    }

    return estaElegivel && verificaElegibilidadeGeral(imovel);
  } catch (erro) {
    logErro(`Erro ao verificar elegibilidade imovel viva real: ${erro}`);
  }
};

const verificaRequisitosVendaVivaReal = (preco) => {
  return Number(preco) <= constants.vivaReal.maxValorVenda;
};

const verificaRequisitosAluguelVivaReal = (imovel) => {
  let porcentagemValorElegivel = true;
  if (estaNaBoundingBox(imovel)) {
    porcentagemValorElegivel =
      imovel.pricingInfos.price <= 1.5 * constants.vivaReal.maxValorAluguel;
  } else {
    porcentagemValorElegivel =
      imovel.pricingInfos.price <= constants.vivaReal.maxValorAluguel;
  }
  const porcentagemCondominioElegivel =
    imovel.pricingInfos.monthlyCondoFee <= 0.3 * imovel.pricingInfos.price;

  return porcentagemValorElegivel && porcentagemCondominioElegivel;
};
