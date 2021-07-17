import { beforeAll, expect, it, jest } from "@jest/globals";
import * as utils from "../../utils/utils.js";
import { query } from "express-validator";
import mocks from "./mocks/utils.mock.js";

describe("Teste logErro", () => {
  const toISOString = jest.fn(() => "2021-01-19T10:20:29Z");
  const realDate = global.Date;
  const realLog = console.log;

  beforeAll(() => {
    global.Date = jest.fn(() => ({
      toISOString,
    }));
    console.log = jest.fn();
  });

  afterAll(() => {
    global.Date = realDate;
    console.log = realLog;
  });

  it("Chama console.log com a mensagem correta", () => {
    utils.logErro(mocks.mensagem);
    expect(console.log).toBeCalledWith(mocks.resposta);
  });
});

describe("Teste função estaNaBoundingBox", () => {
  describe("Quando recebe um imovel que esta na bounding box", () => {
    const resposta = utils.estaNaBoundingBox(mocks.imovelDentroBoundingBox);
    it("Retorna true", () => {
      expect(resposta).toBeTruthy();
    });
  });

  describe("Quando recebe um imovel que não esta na bounding box", () => {
    const resposta = utils.estaNaBoundingBox(mocks.imovelForaBoundingBox);
    it("Retorna false", () => {
      expect(resposta).toBeFalsy();
    });
  });
});

describe("Teste função de paginação", () => {
  describe("Quando recebe número de itens 0", () => {
    const resposta = utils.paginacao(mocks.array, 1, 0);
    it("Retorna array vazio", () => {
      expect(resposta).toEqual([]);
    });
  });
  describe("Quando recebe um número de itens menor que o tamanho do array", () => {
    const resposta = utils.paginacao(mocks.array, 1, 2);
    it("Retorna array com o numero de itens recebidos", () => {
      expect(resposta).toEqual([1, 2]);
    });
  });
  describe("Quando recebe um número de itens maior que o tamanho do array", () => {
    const resposta = utils.paginacao(mocks.array, 1, 12);
    it("Retorna array com todos os elementos do array original", () => {
      expect(resposta).toEqual(mocks.array);
    });
  });
  describe("Quando recebe uma página e numero de itens maior que o tamanho do array", () => {
    const resposta = utils.paginacao(mocks.array, 5, 4);
    it("Retorna array vazio", () => {
      expect(resposta).toEqual([]);
    });
  });
  describe("Quando recebe uma página e um número de itens menor que o tamanho do array", () => {
    const resposta = utils.paginacao(mocks.array, 2, 4);
    it("Retorna array contendo os elementos da página correspondente", () => {
      expect(resposta).toEqual([5, 6, 7, 8]);
    });
  });
  describe("Quando não recebe o array", () => {
    const resposta = jest.fn(() => {
      utils.paginacao(undefined, 1, 2);
    });
    it("Deve lançar exceção", () => {
      expect(resposta).toThrow();
    });
  });
  describe("Quando recebe um número de itens negativo", () => {
    const resposta = jest.fn(() => {
      utils.paginacao(undefined, 2, -1);
    });
    it("Deve lançar exceção", () => {
      expect(resposta).toThrow();
    });
  });
  describe("Quando recebe um número de paginas negativo", () => {
    const resposta = jest.fn(() => {
      utils.paginacao(undefined, -2, 1);
    });
    it("Deve lançar exceção", () => {
      expect(resposta).toThrow();
    });
  });
});

describe("Teste função respostaFormatada", () => {
  const resposta = utils.respostaFormatada(mocks.array, 1, 2, 10);
  it("Retorna itens recebidos formatados", () => {
    expect(resposta).toEqual({
      pageNumber: 1,
      pageSize: 2,
      totalCount: 10,
      listings: mocks.array,
    });
  });
});

describe("Teste função verificaElegibilidadeGeral", () => {
  describe("Quando recebe um imóvel elegível", () => {
    const resposta = utils.verificaElegibilidadeGeral(mocks.imovelElegivel);
    it("Deve retornar true", () => {
      expect(resposta).toBeTruthy();
    });
  });
  describe("Quando recebe um imóvel não elegível", () => {
    const resposta = utils.verificaElegibilidadeGeral(mocks.imovelNaoElegivel);
    it("Deve retornar true", () => {
      expect(resposta).toBeFalsy();
    });
  });
});

describe("Teste da função valida", () => {
  const mockRes = { status: jest.fn(() => ({ json: jest.fn() })) };
  const mockValidacoes = [
    query("page").isInt({ min: 1 }).toInt(),
    query("itens").isInt({ min: 1 }).toInt(),
  ];
  const next = jest.fn();
  describe("Quando a validação retorna erro", () => {
    it("Gera erro com código 400", () => {
      const mockReq = { query: { page: 0, itens: 2 } };
      return utils
        .valida(mockValidacoes)(mockReq, mockRes, next)
        .then(() => {
          expect(mockRes.status).toBeCalledWith(400);
        });
    });
  });
  describe("Quando a validação retorna sucesso", () => {
    const mockReq = { query: { page: 1, itens: 2 } };
    it("Chama a função next", () =>
      utils
        .valida(mockValidacoes)(mockReq, mockRes, next)
        .then(() => {
          expect(next).toBeCalledTimes(1);
        }));
  });
  describe("Quando uma exceção é lançada durante a execução", () => {
    it("Gera erro com código 500", () => {
      const mockValidacoesErro = [
        {
          run: () => {
            throw "erro";
          },
        },
      ];
      const mockReq = { query: { page: 1, itens: 2 } };
      return utils
        .valida(mockValidacoesErro)(mockReq, mockRes, next)
        .then(() => {
          expect(mockRes.status).toBeCalledWith(500);
        });
    });
  });
});
