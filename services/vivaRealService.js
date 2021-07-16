import singleton from "./imoveisSingleton.js";
import {
  estaNaBoundingBox,
  paginacao,
  respostaFormatada,
  verificaElegibilidadeGeral,
} from "../utils/utils.js";
import vivaReal from "../utils/constants/vivaReal.js";

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

const verificaRequisitosVendaVivaReal = ({ pricingInfos }) =>
  Number(pricingInfos.price) <= vivaReal.maxValorVenda;

const verificaRequisitosAluguelVivaReal = (imovel) => {
  const { price, monthlyCondoFee } = imovel.pricingInfos;
  const { maxValorAluguel } = vivaReal;
  const porcentagemCondominioElegivel = monthlyCondoFee <= 0.3 * price;
  if (estaNaBoundingBox(imovel)) {
    return price <= 1.5 * maxValorAluguel && porcentagemCondominioElegivel;
  }
  return price <= maxValorAluguel && porcentagemCondominioElegivel;
};

const verificadorBusinessType = {
  SALE: verificaRequisitosVendaVivaReal,
  RENTAL: verificaRequisitosAluguelVivaReal,
};

const verificaElegibilidadeImovelVivaReal = (imovel) => {
  const { businessType } = imovel.pricingInfos;
  const elegibilidadeGeral = verificaElegibilidadeGeral(imovel);
  const verificaRequisitos =
    verificadorBusinessType[businessType] || (() => false);
  return elegibilidadeGeral && verificaRequisitos(imovel);
};
