const express = require('express');
const controllerUsuario = require('../controllers/usuario.controller');
const router = express.Router();

router.post('/usuarios', controllerUsuario.criarUsuario);
router.get('/usuarios', controllerUsuario.listarUsuarios);
router.get('/usuarios/:email', controllerUsuario.procurarPorEmail);
router.put('/usuarios/:id', controllerUsuario.alterarUsuario);


module.exports = router;