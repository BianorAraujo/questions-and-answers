const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const connection = require("./database/database");
const pergunta = require("./database/model/Pergunta");
const resposta = require("./database/model/Resposta");
const PORT = 3001;

//Express usando o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//models
const Pergunta = connection.model("Pergunta", pergunta);
const Resposta = connection.model("Resposta", resposta);

//usando o bodyparse para pegar os controles da tela com o name
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

//rotas
app.get("/", (req, res) => {

    Pergunta.find().then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    }).catch(err => {
        console.log(err);
    })

        
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarPergunta", (req, res) => {

    const novaPergunta = new Pergunta({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }) 

    novaPergunta.save().then(() => {
        res.redirect("/");
    }).catch(error => {
        console.log(error);
    })

})

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id;

    Pergunta.findById(id).then((pergunta) => {
        if(pergunta != undefined) {
            Resposta.find({"perguntaId": id}).then((respostas) =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }
        else {
            res.redirect("/");
        }
    })
})

app.post("/responder", (req, res) => {
    
    const corpo = req.body.corpo;
    const perguntaId = req.body.perguntaId;

    const novaResposta = new Resposta({
        corpo: corpo,
        perguntaId: perguntaId
    })

    novaResposta.save().then(() => {
        res.redirect("/pergunta/" + perguntaId)
    }).catch(error => {
        console.log(error);
    })
})

app.listen(PORT, () => {
    console.log("App rodando na porta 3001")
})
