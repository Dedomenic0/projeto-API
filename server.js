import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

const rotas = {
    "/": "Curso de Node.js",
    "/livros": "entrei na rota livros",
    "/autores": "entrei na rota autores!"
};

app.listen(PORT, () =>{
    console.log("Servidor escutando!");
});