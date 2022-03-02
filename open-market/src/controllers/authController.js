import { v4 } from "uuid";
import connection from "../db";

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    await connection.query(
      `INSERT INTO usuarios (nome,email,senha) VALUES ($1,$2,$3)`,
      [name, email, password]
    );
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function logIn(req, res) {
  const { email, password } = req.body;

  try {

    const user = await connection.query("SELECT id FROM usuarios WHERE email=$1",
    [email]);
    if(user.rowCount===0){
        return res.sendStatus(404);
    }
    const name = user.rows.name;
    
    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await connection.query(
        `INSERT INTO sessoes ("idUsuario", token) VALUES($1, $2)
                [user, token]
                `
      );
      res.send({ name, email, token });
      return;
    }
    res.sendStatus(401);
    return;
  } catch {
    res.sendStatus(500);
  }
}
