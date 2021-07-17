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
  it("Carrega imóveis e salva informação no objeto de imóveis", async () => {
    await imoveisSingleton.carregarImoveis();
    expect(imoveisSingleton.imoveis).toEqual("data");
  });

  it("Retorna o array de imóveis preenchido sem necessidade de outra chamada a função", () => {
    expect(imoveisSingleton.imoveis).toEqual("data");
  });
});
