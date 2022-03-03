import db from '../db.js';

export default async function validateTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  const resultSessions = await db.query('SELECT * FROM sessoes WHERE token=$1', [token]);
  if (resultSessions.rowCount === 0) {
    return res.sendStatus(401);
  }

  const session = resultSessions.rows[0];
  const resultUser = await db.query('SELECT * FROM usuarios WHERE id=$1', [session.idUsuario]);
  if (resultUser.rowCount === 0) {
    return res.sendStatus(401);
  }

  res.locals.user = resultUser.rows[0];
  next();
}