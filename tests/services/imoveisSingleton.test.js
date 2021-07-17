import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import singleton from "../../services/imoveisSingleton.js";

describe("Teste do singleton de imóveis", () => {
  const imoveisSingleton = new singleton().getInstance();
  const realAxiosGet = axios.get;
  beforeAll(() => {
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: "data" }));
  });
  afterAll(() => {
    axios.get = realAxiosGet;
  });
  it("Testa o recebimento da instância do Singleton", async () => {
    await imoveisSingleton.carregarImoveis();
    expect(imoveisSingleton.imoveis).toEqual("data");
  });

  it("Testa se a instância permanece com os dados salvos sem a necessidade de outra chamada", () => {
    expect(imoveisSingleton.imoveis).toEqual("data");
  });
});
