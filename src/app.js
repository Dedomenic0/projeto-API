import express from "express";
import conectaNaDataBase from "./config/dbConect.js";
import routes from "./routes/index.js";


const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conectado ao banco de dados");
});

const app = express();
routes(app);

export default app;


