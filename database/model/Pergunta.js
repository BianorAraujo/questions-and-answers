const mongoose = require("mongoose");

const Pergunta = new mongoose.Schema({
    titulo: String,
    descricao: String,
    date: {type: Date, default: Date.now}
});

module.exports = Pergunta;