/* eslint-disable linebreak-style */
import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) 
{erro instanceof mongoose.Error.CastError ? res.status(400).json({ message: "Dado de pesquisa incorreto"}) : res.status(500).json({ message: `${erro.message} - falha na requisição `});
};

export default manipuladorDeErros;