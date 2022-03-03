import db from '../db.js';

export async function getCategories(req, res) {
  const { user } = res.locals;

  try {
    const result = await db.query(`SELECT * FROM categorias`);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCategory(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(`SELECT * FROM categorias WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createCategory(req, res) {
  const category = req.body;

  try {
    const result = await db.query(`SELECT id FROM categorias WHERE nome=$1`, [category.nome]);
    if (result.rowCount > 0) {
      return res.status(409).send('Categoria já criada');
    }

    await db.query(`
      INSERT INTO 
        categorias (nome)
        VALUES ($1)
    `, [category.nome]);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function updateCategory(req, res) {
  const category = req.body;
  const { id } = req.params;

  try {
    await db.query(`
      UPDATE categorias
        SET nome=$1
      WHERE id=$2
    `, [category.nome, id])

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    await db.query(`
      DELETE FROM categorias WHERE id=$1
    `, [id])

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}