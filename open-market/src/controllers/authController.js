import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export default async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email=$1", [email]);
    if (result.rowCount === 0) {
      return res.sendStatus(401);
    }

    const user = result.rows[0];
    if (!bcrypt.compareSync(senha, user.senha)) {
      return res.sendStatus(401);
    }

    const token = uuid();

    await db.query(`
      INSERT INTO 
        sessoes ("idUsuario", token)
        VALUES ($1, $2)
    `, [user.id, token]);

    res.send({
      token
    });
  } catch (error) {
    res.status(500).send(error);
  }
}