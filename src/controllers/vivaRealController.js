import { logErro } from "../utils/utils.js";

export const buscarImoveisVivaReal = async (req, res, validationResult) => {
  try {
    //chamada ao service
    res.status(200).send("sucesso");
  } catch (erro) {
    logErro(`Erro ao bucar imoveis viva real: ${erro}`);
    throw erro;
  }
};
