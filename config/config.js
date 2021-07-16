import dotenv from "dotenv";

dotenv.config();

const configuracoes = {
  urlImoveis: process.env.URL_IMOVEIS,
  porta: process.env.PORTA || 5000,
};

export default configuracoes;
