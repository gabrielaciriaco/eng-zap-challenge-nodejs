import imoveisRepository from "../repositories/imoveisRepository.js";

class Imoveis {
  constructor() {
    this.imoveis = [];
  }

  carregarImoveis = async () => {
    this.imoveis = await imoveisRepository.buscarImoveis();
  };
}

class ImoveisSingleton {
  constructor() {
    if (!ImoveisSingleton.instance) {
      ImoveisSingleton.instance = new Imoveis();
    }
  }

  getInstance() {
    return ImoveisSingleton.instance;
  }
}

export default ImoveisSingleton;
