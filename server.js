const express = require('express');
const app = express();
const rotas = require('./routes/usuario.route');
const rotamovimentacao = require ('./routes/movimentacao.route')

app.use(express.json());

app.use(rotas);
app.use(rotamovimentacao)
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

