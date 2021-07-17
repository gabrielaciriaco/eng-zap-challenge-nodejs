import { buscarImoveisVivaReal } from "../../controllers/vivaRealController.js";
import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";

describe("Teste do controller viva real", () => {
  const realAxiosGet = axios.get;
  beforeAll(() => {
    axios.get = jest.fn().mockImplementationOnce(() => []);
  });
  afterAll(() => {
    axios.get = realAxiosGet;
  });
  const mockSend = jest.fn();
  const mockReq = { query: { page: 1, itens: 2 } };
  const mockRes = { status: jest.fn(() => ({ send: mockSend })) };
  it("Retorna status 200 com a resposta esperada", () => {
    buscarImoveisVivaReal(mockReq, mockRes);
    expect(mockSend).toBeCalledWith({
      listings: [],
      pageNumber: 1,
      pageSize: 2,
      totalCount: 0,
    });
  });
});
