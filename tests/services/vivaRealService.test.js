import { describe, expect, it, jest } from "@jest/globals";
import {
  buscarImoveisVivaRealService,
  verificaRequisitosVendaVivaReal,
  verificaRequisitosAluguelVivaReal,
} from "../../services/vivaRealService.js";
import mocks, { imoveisVivaRealServiceMock } from "./vivaRealService.mock.js";
import singleton from "../../services/imoveisSingleton.js";
import axios from "axios";

describe("Testando função verificaRequisitosVendaVivaReal", () => {
  it("Recebendo imóvel elegível", () => {
    const resposta = verificaRequisitosVendaVivaReal(mocks.imovelElegivelVenda);
    expect(resposta).toBeTruthy();
  });
  it("Recebendo imóvel inelegível", () => {
    const resposta = verificaRequisitosVendaVivaReal(
      mocks.imovelInelegivelVenda
    );
    expect(resposta).toBeFalsy();
  });
});

describe("Testando função verificaRequisitosAluguelVivaReal", () => {
  describe("Recebendo imóvel elegível", () => {
    it("Imovel fora da bounding box, Retorna true", () => {
      const resposta = verificaRequisitosVendaVivaReal(
        mocks.imovelElegivelVenda
      );
      expect(resposta).toBeTruthy();
    });
    it("Imovel dentro da bounding box, Retorna true", () => {
      const resposta = verificaRequisitosVendaVivaReal(
        mocks.imovelElegivelAluguelDentroBoundingBox
      );
      expect(resposta).toBeTruthy();
    });
  });
  describe("Recebendo imóvel inelegível", () => {
    it("Imovel fora da bounding box com preço maior que o max valor, retorna false", () => {
      const resposta = verificaRequisitosAluguelVivaReal(
        mocks.imovelInelegivelAluguelPrecoMaior
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel dentro da bounding box com preço maior que o max valor, retorna false", () => {
      const resposta = verificaRequisitosAluguelVivaReal(
        mocks.imovelInelegivelAluguelPrecoMaiorDentroBoundingBox
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel com monthlyCondoFee maior que 30% do preço, retorna false", () => {
      const resposta = verificaRequisitosAluguelVivaReal(
        mocks.imovelInelegivelAluguelMonthlyCondoFeeMaior
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel com monthlyCondoFee maior que 30% do preço e preço maior que max valor, retorna false", () => {
      const resposta = verificaRequisitosAluguelVivaReal(
        mocks.imovelInelegivelAluguel
      );
      expect(resposta).toBeFalsy();
    });
  });
});

describe("Testando função buscarImoveisVivaRealService", () => {
  const imoveisSingleton = new singleton().getInstance();
  const realAxiosGet = axios.get;
  beforeAll(() => {
    axios.get = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ data: imoveisVivaRealServiceMock.imoveis })
      );
  });
  afterAll(() => {
    axios.get = realAxiosGet;
  });
  it("Retorna objeto esperado", async () => {
    await imoveisSingleton.carregarImoveis();
    const resposta = buscarImoveisVivaRealService(1, 3);
    expect(resposta).toEqual(imoveisVivaRealServiceMock.retornoEsperado);
  });
});
