import { livro, autor } from "../models/index.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;

    try { 
      let autorEncontrado = await autor.findById(novoLivro.autor);
      let livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
      let livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
      
    } catch (erro) {
      next(erro);
      
    }
  }
  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);  
      
      livroEncontrado == null ? next(new NaoEncontrado("Livro não encontrado")) : res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);  
      
      console.log(livro.findByIdAndUpdate(id, req.body));

      id == null ? next(new NaoEncontrado("Livro não encontrado")) : res.status(200).json("Livro atualizado");

    } catch (erro) {
      next(erro);
    }
  }
  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete (id);
      id == null ? next(new NaoEncontrado("Livro não encontrado")) : res.status(200).json("Livro deletado");
    } catch (erro) {
      next(erro);
    }
  }


  static async listarLivrosPorFiltro (req, res, next) {
    
    try {
      const {editora, titulo, nomeAutor} = req.query;
      let busca = {};
      
      if (editora) busca.editora = { $regex: editora, $options: "i" };
      if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
      if (nomeAutor) busca = { ...busca, "autor.nome": nomeAutor};
      
      const livrosPorEditora = livro.find(busca);
      req.resultado = livrosPorEditora;
      next();
    } catch (erro){
      next(erro);
      console.error(erro);
    }
  }
};

export default LivroController;