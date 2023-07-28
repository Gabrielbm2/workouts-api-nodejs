const personalService = require('../services/personal_service');
const models = require('./models');
const responder = require('../responder');

const registerPersonal = async (req, res) => {
  try {
    const { nome, sobrenome, email, cpf, senha } = req.body;

    if (!nome || !sobrenome || !email || !cpf || !senha) {
      return responder.JSON(res, { error: 'Por favor, preencha todos os campos obrigatórios' }, 400);
    }

    const existingPersonal = await personalService.getPersonalByEmailOrCpf(email, cpf);
    if (existingPersonal) {
      return responder.JSON(res, { error: 'Email ou CPF já estão cadastrados' }, 409);
    }

    await personalService.registerPersonal(nome, sobrenome, email, cpf, senha);
    return responder.JSON(res, { message: 'Personal registrado com sucesso' }, 201); // 201 Created (ou você pode deixar o status padrão, que é 200)
  } catch (error) {
    console.error('Erro ao registrar personal:', error);
    return responder.JSON(res, { error: 'Erro ao registrar personal' }, 500); // 500 Internal Server Error
  }
};

const loginPersonal = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return responder.JSON(res, { error: 'Por favor, informe o email e a senha' }, 400);
    }

    const personal = await personalService.loginPersonal(email, senha);
    return responder.JSON(res, personal);
  } catch (error) {
    console.error('Erro ao fazer login como personal:', error);
    return responder.JSON(res, { error: 'Erro ao fazer login como personal' }, 500); // 500 Internal Server Error
  }
};

module.exports = {
  registerPersonal,
  loginPersonal,
};
