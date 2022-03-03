import joi from 'joi';

const productSchema = joi.object({
  nome: joi.string().required(),
  preco: joi.number().required(),
  idCategoria: joi.number().required()
});

export default productSchema;