import expressValidator from "express-validator";

const { query } = expressValidator;

export const validacoesPaginacao = [
  query("page").isInt({ min: 1 }).toInt(),
  query("itens").isInt({ min: 1 }).toInt(),
];
