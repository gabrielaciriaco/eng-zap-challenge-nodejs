import { logErro } from "../utils/utils.js";

export const buscarImoveisZap = async (req, res, validationResult) => {
  try {
    //chamada ao service
    res.status(200).send("sucesso");
  } catch (erro) {
    logErro(`Erro ao bucar imóveis zap: ${erro}`);
    throw erro;
  }
};
