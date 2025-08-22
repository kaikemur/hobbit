import express from "express"
import personagens from "./src/data/personagens.js";


const app = express();
app.use(express.json());

const serverPort = 3003;

app.get("/",(req,res) => {
    res.send("bem vindo ao servidor de hobbit")
})

app.get("/personagens",(req,res) => {
    res.json(personagens);
})


app.get("/personagens/:id", (req,res) => {

    const id = parseInt(req.params.id);

    const personagen = personagens.find(b => b.id === id);

    if(personagen){
        res.status(200).json(personagen)
    } else{
        res.status(404).json(personagen)({
            mensagen:"personagen não encontrados"
        })
    }
})


app.get("/personagens/nome/:nome", (req,res) => {
    let nome = req.params.nome
    nome = nome.toLowerCase()

    const nomesFiltrados = personagens.find(p => p.nome.toLowerCase().includes(nome))

    if(nomesFiltrados){
        res.status(200).json(nomesFiltrados);
    }else{
        res.status(404).json({
            mensagem:"personagen não encontrado!"
        })
    }
})

app.get("/personagens/raca/:raca", (req,res) => {
    let raca = req.params.raca
    raca = raca.toLowerCase()

    const racasFiltrados = personagens.filter(p => p.raca.toLowerCase().includes(raca))

    if(racasFiltrados){
        res.status(200).json(racasFiltrados);
    }else{
        res.status(404).json({
            mensagem:"raça não encontrado!"
        })
    }

})

app.get("/personagens/vivos/sim", (req,res) => {
    const personagensVivos = personagens.filter(p => p.vivo === true)
    if(personagensVivos){
        res.status(200).json(personagensVivos)
    }
})



app.listen(serverPort, () => {
    console.log("Servidor esta em pe")
});