import db from '../db.js';

export async function getProducts(req, res) {
  const { user } = res.locals;

  try {
    const result = await db.query(`
        SELECT 
          produtos.*, 
          usuarios.nome AS "nomeUsuario",
          categorias.nome AS "nomeCategoria"
        FROM produtos 
          JOIN usuarios ON usuarios.id=produtos."idUsuario"
          JOIN "produtosCategorias" ON "produtosCategorias"."idProduto"=produtos.id
          JOIN categorias ON categorias.id="produtosCategorias"."idCategoria"
        WHERE "idUsuario"=$1`, [user.id]);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProduct(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT 
        produtos.*, 
        usuarios.nome AS "nomeUsuario",
        categorias.nome AS "nomeCategoria"
      FROM produtos 
        JOIN usuarios ON usuarios.id=produtos."idUsuario"
        JOIN "produtosCategorias" ON "produtosCategorias"."idProduto"=produtos.id
        JOIN categorias ON categorias.id="produtosCategorias"."idCategoria"
      WHERE produtos.id=$1 AND "idUsuario"=$2
    `, [id, user.id]);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req, res) {
  const { user } = res.locals;
  const product = req.body;

  try {
    const result = await db.query(`
      INSERT INTO 
        produtos (nome, preco, "idUsuario")
        VALUES ($1, $2, $3)
      RETURNING id;
    `, [product.nome, product.preco, user.id]);

    const createdProduct = result.rows[0];

    console.log(createdProduct.id)
    console.log(product.idCategoria)

    await db.query(`
      INSERT INTO 
        "produtosCategorias" ("idProduto", "idCategoria")
        VALUES ($1, $2)
    `, [createdProduct.id, product.idCategoria]);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function updateProduct(req, res) {
  const { user } = res.locals;
  const product = req.body;
  const { id } = req.params;

  try {
    await db.query(`
      UPDATE produtos
        SET nome=$1, preco=$2
      WHERE id=$3 AND "idUsuario"=$4
    `, [product.nome, product.preco, id, user.id])

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function deleteProduct(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    await db.query(`
      DELETE FROM produtos WHERE id=$1 AND "idUsuario"=$2
    `, [id, user.id])

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}