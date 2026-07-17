var express = require("express");
var router = express.Router();

var aulaController = require("../controllers/aulaController");

router.get("/concluidas/:idUsuario", function (req, res) {
    aulaController.listarConcluidas(req, res);
});

router.get("/listar", function (req, res) {
    aulaController.listarAulas(req, res);
});

router.post("/concluir/:idUsuario/:idAula", function (req, res) {
    aulaController.concluir(req, res);
})

router.post("/desconcluir/:idUsuario/:idAula", function (req, res) {
    aulaController.desconcluir(req, res);
})

router.get("/grafico/:idUsuario", function (req, res) {
    aulaController.obterDados(req, res);
});

module.exports = router;