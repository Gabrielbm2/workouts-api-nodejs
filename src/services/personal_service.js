const bcrypt = require('bcrypt');
const db = require('../db');
const Personal = require('../models/personalModel');

async function registerPersonal(nome, sobrenome, email, cpf, senha) {
  try {
    if (!nome || !sobrenome || !email || !cpf || !senha) {
      throw new Error('Por favor, preencha todos os campos obrigatórios');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const sqlNewPersonal = `
      INSERT INTO personal (nome, sobrenome, email, cpf, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;

    const { rows } = await db.query(sqlNewPersonal, [nome, sobrenome, email, cpf, hashedSenha]);
    const newPersonalId = rows[0].id;

    const newPersonal = new Personal(newPersonalId, nome, sobrenome, email, cpf);

    return newPersonal;
  } catch (error) {
    console.error('Erro ao registrar personal:', error);
    throw new Error('Erro ao registrar personal');
  }
}

async function loginPersonal(email, senha) {
  try {
    if (!email || !senha) {
      throw new Error('Por favor, informe o email e a senha');
    }

    const sqlPersonalLogin = `
      SELECT id, nome, sobrenome, email, cpf, senha FROM personal WHERE (email = $1 OR cpf = $1)
    `;

    const { rows } = await db.query(sqlPersonalLogin, [email]);

    if (rows.length === 0) {
      throw new Error('Credenciais inválidas');
    }

    const personalData = rows[0];
    const senhaMatch = await bcrypt.compare(senha, personalData.senha);

    if (!senhaMatch) {
      throw new Error('Credenciais inválidas');
    }

    const personal = new Personal(
      personalData.id,
      personalData.nome,
      personalData.sobrenome,
      personalData.email,
      personalData.cpf
    );

    return personal;
  } catch (error) {
    console.error('Erro ao fazer login como personal:', error);
    throw new Error('Erro ao fazer login como personal');
  }
}

module.exports = {
  registerPersonal,
  loginPersonal,
};
