/* eslint-disable indent */
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {
    let { limite = 5, pagina = 1, ordenacao = "titulo:1" } = req.query;
      
    let [campoOrdenado, ordem] = ordenacao.split(":");
      
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);

    const resultado = req.resultado;

      if (limite > 0 && pagina > 0) {
        const resultadoPaginado = await resultado.find({}).sort({ [campoOrdenado]: ordem })  //find se conecta ao banco e busca oq foi especificado 
          .skip((pagina - 1) * limite).limit(limite);
        res.status(200).json(resultadoPaginado);
      } else {
        next(new RequisicaoIncorreta());
      }
    } catch (erro) {
        next(erro);
    }
};

export default paginar;