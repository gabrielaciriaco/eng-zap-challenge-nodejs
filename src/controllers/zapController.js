import { logErro } from "../utils/utils.js";
import { buscarImoveisZapService } from "../services/zapService.js";

export const buscarImoveisZap = async (req, res) => {
  try {
    const { page, itens } = req.query;
    const data = buscarImoveisZapService(page, itens);
    res.status(200).send(data);
  } catch (erro) {
    logErro(`Erro ao bucar imóveis zap: ${erro}`);
    throw erro;
  }
};
