import bcrypt from 'bcrypt';
import db from '../db.js';

export default async function createUser(req, res) {
  const user = req.body;

  try {
    const senhaCripto = bcrypt.hashSync(user.senha, 10);

    await db.query(`
      INSERT INTO 
        usuarios (nome, email, senha) 
        VALUES ($1, $2, $3)
    `, [user.nome, user.email, senhaCripto]);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error)
  }
}