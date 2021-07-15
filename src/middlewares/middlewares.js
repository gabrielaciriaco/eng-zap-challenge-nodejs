import expressValidator from "express-validator";

const { validationResult } = expressValidator;

export const validaRequisicao = (metodoController) => async (req, res) => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(400).send("Bad request.");
    }
    await metodoController(req, res);
  } catch (erro) {
    res.status(500).send("Internal server error.");
  }
};
