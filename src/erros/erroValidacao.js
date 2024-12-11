import RequisicaoIncorreta from "./requisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro){
    const mensagemErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Erro encontrado ${mensagemErro}`);
  }
}

export default ErroValidacao;