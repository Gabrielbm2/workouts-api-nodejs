const models = require('./models');

const registerPersonal = async (req, res) => {
  try {
    const { nome, sobrenome, email, cpf, senha } = req.body;

    if (!nome || !sobrenome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios' });
    }

    const existingPersonal = await models.getPersonalByEmailOrCpf(email, cpf);
    if (existingPersonal) {
      return res.status(409).json({ error: 'Email ou CPF já estão cadastrados' });
    }

    const newPersonal = await models.insertPersonal(nome, sobrenome, email, cpf, senha);
    res.json(newPersonal);
  } catch (error) {
    console.error('Erro ao registrar personal:', error);
    res.status(500).json({ error: 'Erro ao registrar personal' });
  }
};

const loginPersonal = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Por favor, informe o email e a senha' });
    }

    const personal = await models.getPersonalByEmail(email);
    if (!personal) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (personal.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json(personal);
  } catch (error) {
    console.error('Erro ao fazer login como personal:', error);
    res.status(500).json({ error: 'Erro ao fazer login como personal' });
  }
};

module.exports = {
  registerPersonal,
  loginPersonal,
};
