const express = require('express');
const controllerMovimentacao = require('../controllers/movimentacao.controller');
const router = express.Router();

router.post('/movimentacao', controllerMovimentacao.criarMovimentacao);
router.get('/movimentacao/:usuario_id', controllerMovimentacao.listarMovimentacoes);
router.get('/movimentacao/:obtersaldo/:usuario_id', controllerMovimentacao.obterSaldo);
router.put('/movimentacao/:id', controllerMovimentacao.alterarMovimentacao); 
router.delete('/movimentacao/:id', controllerMovimentacao.deletarMovimentacao);
module.exports = router