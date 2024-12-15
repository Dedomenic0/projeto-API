import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [true, "Titulo não fornecido"] },
  editora: { type: String, required: [true, "editora não informada"], 
    enum:{
      values: ["Classicos", "Compact", "Livretos"],
      message: "Editora {VALUE} nao cadastrada"} },
  preco: { type: Number },
  paginas: { type: Number, 
    validate: {
      validator: (valor) => {
        return valor >=10 && valor <=5000;
      },
      message: "O numero de paginas {VALUE} encontra-se fora da faixa de 10 a 5000"
    },
    autor: autorSchema
  }  }, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;

