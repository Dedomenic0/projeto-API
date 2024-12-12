import { livro, autor } from "../models/index.js";
import NaoEncontrado from "../erros/naoEncontrado.js";
//import mongoose from "mongoose";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({}); //find se conecta ao banco e busca oq foi especificado 
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;

    try { 
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
      const livroCriado = await livro.create(livroCompleto);
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

  static async listarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora; 
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro){
      next(erro);
    }
  }
};

export default LivroController;