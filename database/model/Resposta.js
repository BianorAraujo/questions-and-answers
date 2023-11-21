const mongoose = require("mongoose");

const Resposta = new mongoose.Schema({
    corpo: String,
    perguntaId: String,
    date: {type: Date, default: Date.now}
});

module.exports = Resposta;