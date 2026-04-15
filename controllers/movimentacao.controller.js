const db = require('../database/db');

exports.criarMovimentacao = async (req, res) => {
    const {usuario_id, titulo, valor, tipo} = req.body;

    if(!['receita', 'despesa'].includes(tipo))  //includes usado para verificar 
        return res.status(400).json({message: 'tipo invalido'})

    const resultado = await db.query('INSERT INTO movimentacoes (usuario_id,titulo, valor, tipo) values ($1, $2, $3, $4) RETURNING *', [usuario_id ,titulo, valor, tipo])

    res.status(201).json({mensagem: "Cadastro de movimentação realizado com sucesso!!"});
}

exports.listarMovimentacoes = async (req, res)=>{
    const usuario_id = Number(req.params.usuario_id);
    const movimentacao = await db.query('SELECT * FROM movimentacoes where id = $1', [usuario_id]);

    res.json(movimentacao.rows);
}

exports.obterSaldo = async (req, res)=>{
    const usuario_id = Number(req.params.usuario_id);

    if(!usuario_id)
        return res.status(404).json({message: 'Usuario não encontrado'})

    const resultado = await db.query(`
        SELECT 
            sum(case when tipo = 'receita' then valor else 0 end) as receitas
            ,sum(case when tipo = 'despesa' then valor else 0 end) as despesas
        from
            public.movimentacoes
        where
            usuario_id = $1`, [usuario_id])

    const {receitas, despesas} = resultado.rows[0]
    const saldo = (receitas || 0) - (despesas || 0)
    res.json({
        receitas: receitas || 0,
        despesas: despesas || 0,
        saldo: saldo || 0
    })
   
}
exports.alterarMovimentacao = async (req, res) => {
    const id = Number(req.params.id);
    
    if(!req.params.id || isNaN(id))
        return res.status(400).json({message: 'ID inválido!!!'})
        
    const {usuario_id, titulo, valor, tipo} = req.body;

    const resultado = await db.query('UPDATE movimentacoes set titulo=$1, valor=$2, tipo=$3, usuario_id=$4 where id=$5 RETURNING *', [titulo, valor, tipo, usuario_id, id]);

    if(resultado.rows.length === 0)
        return res.status(404).json({message: 'Movimentação não encontrada!!!'})

    res.json({message:'Movimentação alterada com sucesso!!'});
}

exports.deletarMovimentacao = async (req, res) => {
    const id = Number(req.params.id);
    
    if(!req.params.id || isNaN(id))
        return res.status(400).json({message: 'ID inválido!!!'})
        
    const resultado = await db.query('DELETE FROM movimentacoes where id=$1 RETURNING *', [id]);

    if(resultado.rows.length === 0)
        return res.status(404).json({message: 'Movimentação não encontrada!!!'})

    res.json({message:'Movimentação deletada com sucesso!!'});
}
