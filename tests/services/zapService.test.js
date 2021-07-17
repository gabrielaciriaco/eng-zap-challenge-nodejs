import { describe, expect, it, jest } from "@jest/globals";
import {
  buscarImoveisZapService,
  verificaRequisitosVendaZap,
  verificaRequisitosAluguelZap,
} from "../../services/zapService";
import mocks, { imoveisZapServiceMock } from "./mocks/zapService.mock.js";
import singleton from "../../services/imoveisSingleton.js";
import axios from "axios";

describe("Testando função verificaRequisitosAluguelZap", () => {
  it("Recebendo imóvel elegível, retorna true", () => {
    const resposta = verificaRequisitosAluguelZap(mocks.imovelElegivelAluguel);
    expect(resposta).toBeTruthy();
  });
  it("Recebendo imóvel inelegível, retorna false", () => {
    const resposta = verificaRequisitosAluguelZap(
      mocks.imovelInelegivelAluguel
    );
    expect(resposta).toBeFalsy();
  });
});

describe("Testando função verificaRequisitosVendaZap", () => {
  describe("Recebendo imóvel elegível", () => {
    it("Imovel fora da bounding box, Retorna true", () => {
      const resposta = verificaRequisitosVendaZap(mocks.imovelElegivelVenda);
      expect(resposta).toBeTruthy();
    });
    it("Imovel dentro da bounding box, Retorna true", () => {
      const resposta = verificaRequisitosVendaZap(
        mocks.imovelElegivelVendaDentroBoundingBox
      );
      expect(resposta).toBeTruthy();
    });
  });
  describe("Recebendo imóvel inelegível", () => {
    it("Imovel fora da bounding box com preço menor que o min valor, retorna false", () => {
      const resposta = verificaRequisitosVendaZap(
        mocks.imovelInelegivelVendaPrecoMenor
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel dentro da bounding box com preço menor que o min valor, retorna false", () => {
      const resposta = verificaRequisitosVendaZap(
        mocks.imovelInelegivelVendaPrecoMenorDentroBoundingBox
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel com usabledAreas menor que 3500, retorna false", () => {
      const resposta = verificaRequisitosVendaZap(
        mocks.imovelInelegivelVendaUsableAreasMenor
      );
      expect(resposta).toBeFalsy();
    });
    it("Imovel com usableAreas menor que 3500 e preço menor que min valor, retorna false", () => {
      const resposta = verificaRequisitosVendaZap(mocks.imovelInelegivelVenda);
      expect(resposta).toBeFalsy();
    });
  });
});

describe("Testando função buscarImoveisZapService", () => {
  const imoveisSingleton = new singleton().getInstance();
  const realAxiosGet = axios.get;
  beforeAll(() => {
    axios.get = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ data: imoveisZapServiceMock.imoveis })
      );
  });
  afterAll(() => {
    axios.get = realAxiosGet;
  });
  it("Retorna objeto esperado", async () => {
    await imoveisSingleton.carregarImoveis();
    const resposta = buscarImoveisZapService(1, 3);
    expect(resposta).toEqual(imoveisZapServiceMock.retornoEsperado);
  });
});
