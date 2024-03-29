import { logErro } from "../utils/utils.js";
import { buscarImoveisVivaRealService } from "../services/vivaRealService.js";

export const buscarImoveisVivaReal = async (req, res) => {
  try {
    const { page, itens } = req.query;
    const dados = buscarImoveisVivaRealService(page, itens);
    res.status(200).send(dados);
  } catch (erro) {
    logErro(`Erro ao bucar imoveis viva real: ${erro}`);
    throw erro;
  }
};
