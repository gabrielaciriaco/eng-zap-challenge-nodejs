import axios from "axios";
import configuracoes from "../config/config.js";
import { logErro } from "../utils/utils.js";

const buscarImoveis = async () => {
  try {
    const imoveis = await axios.get(configuracoes.urlImoveis);
    return imoveis.data;
  } catch (erro) {
    logErro(`Erro ao buscar imóveis: ${erro}`);
  }
};

const imoveisRepositorio = { buscarImoveis };

export default imoveisRepositorio;
