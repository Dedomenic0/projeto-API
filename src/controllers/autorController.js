//import mongoose from "mongoose";
import NaoEncontrado from "../erros/naoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res, next) {
    try {
      const listaAutores =  autor.find({}); //find se conecta ao banco e busca oq foi especificado 
      req.resultado = listaAutores;
      
      next();
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha na requisição`});
    }
  }

  static async cadastrarAutores (req, res, next) {
    try { 
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }
  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);  
      
      
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      }else {
        next(new NaoEncontrado("Autor não encontrado"));};
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);  
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      next(erro);
    }
  }
  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete (id);
      res.status(200).json ({ mensage: "Autor deletado" });
    } catch (erro) {
      next(erro);
    }
  }
};

export default AutorController;