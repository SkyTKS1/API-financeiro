const db = require('../database/db');

async function criarUsuario(req, res) {
    const {nome, email} = req.body;
    const resultado = await db.query('INSERT INTO usuarioS (nome, email) values ($1, $2) RETURNING *', [nome, email]);

    res.status(201).json({mensagem: "Cadastro realizado com sucesso"})
}

async function listarUsuarios(req, res) {
    const usuarios = await db.query('SELECT * FROM usuarios');
    res.json(usuarios.rows)
}

async function alterarUsuario(req, res) {
    const id = Number(req.params.id);
    const {nome, email} = req.body;

    const resultado = await db.query('UPDATE usuarios set nome=$1, email=$2 where  id=$3 RETURNING *', [nome, email, id]);

    if(resultado.rows.length === 0)
        return res.status(404).json({message: 'Usuario não encontrado!!!'})

    res.json({message:'Usuario alterado com sucesso!!'});
}

async function procurarPorEmail(req, res) {
    const email = req.params.email
    const resultado = await db.query('SELECT * FROM usuarios where email=$1',[email]);
    
    if(resultado.rows.length === 0)
        return res.status(404).json({message:'Usuario não encontrado'})
    res.json(resultado.rows)
}

module.exports={
    criarUsuario,
    listarUsuarios,
    alterarUsuario,
    procurarPorEmail
}