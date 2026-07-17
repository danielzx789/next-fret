var aulaModel = require("../models/aulaModel");

function listarConcluidas(req, res) {


    var idUsuario = req.params.idUsuario;

    aulaModel.listarConcluidas(idUsuario)
    .then(function (resultado) {
            res.status(200).json(resultado);
    })

       .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarAulas(req, res) {



    aulaModel.listarAulas()
    .then(function (resultado) {
            res.status(200).json(resultado);
    })

       .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as aulas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function desconcluir(req, res) {
    var idUsuario = req.params.idUsuario;
    var idAula = req.params.idAula;

    aulaModel.desconcluir(idUsuario,idAula).then(function (resultado) {
            res.json(resultado);

    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao desmarcar aula.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function concluir(req, res){
    var idUsuario = req.params.idUsuario;
    var idAula = req.params.idAula;

     if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else if (idAula == undefined) {
        res.status(400).send("O id da aula está undefined!");
    }
     else {
        aulaModel.concluir(idUsuario, idAula)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao concluir aula: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
async function obterDados(req, res) {


    var idUsuario = req.params.idUsuario;

   var aulas_concluidas = await aulaModel.listarConcluidas(idUsuario) 
   var quantidade_aulas_concluidas = aulas_concluidas.length

var  listarAulas = await aulaModel.listarAulas() 
var quantidade_aulas = listarAulas.length
var porcentagemProgresso = quantidade_aulas_concluidas / quantidade_aulas * 100
var quantidade_aulas_restantes = quantidade_aulas - quantidade_aulas_concluidas
var incremento = quantidade_aulas_concluidas > 3 ?quantidade_aulas_concluidas -3: 0
var id_aulas_concluidas = aulas_concluidas.map(aula => aula.id) 
var aulas_concluidas_filtradas = listarAulas.filter(aula => id_aulas_concluidas.includes(aula.id)) 
var ultimas_aulas_concluidas = []
for(let i = incremento; i < quantidade_aulas_concluidas; i++){

ultimas_aulas_concluidas.push({
    idAula: aulas_concluidas_filtradas[i].id,
    nomeAula: aulas_concluidas_filtradas[i].nome

})
}
var listarConcluidasPorTempo = await aulaModel.listarConcluidasPorTempo(idUsuario)
var concluidas_por_tempo_formatado = listarConcluidasPorTempo.map(data => {
var dia = data.data.getDate()    
var mes = data.data.getMonth() + 1
var ano = data.data.getFullYear()    
    
    return {
        total: data.total,
        data: `${dia < 10 ? "0" : ""}${dia}/${mes < 10 ? "0" : ""}${mes}/${ano}`
    } 
}) 
var comparacao = await aulaModel.comparacaoUsuarios()
var colocacaoUsuario = comparacao.map((colocacao, indice) => {
    return {
        indice, 
        colocacaoId: colocacao.id
    }
}).filter(colocacao => colocacao.colocacaoId == idUsuario)
colocacaoUsuario = colocacaoUsuario[0].indice + 1
var formulaComparacao = ((comparacao.length - colocacaoUsuario) / (comparacao.length - 1) * 100).toFixed(1) 

   var retorno = {
    "quantidade_aulas_concluidas": quantidade_aulas_concluidas,
    "quantidade_aulas_restantes": quantidade_aulas_restantes,
    "porcentagemProgresso": porcentagemProgresso,
    "ultimas_aulas_concluidas": ultimas_aulas_concluidas,
    "listarConcluidasPorTempo": concluidas_por_tempo_formatado,
    "colocacaoUsuario": formulaComparacao,
   }
   return res.status(200).send(retorno)
}
module.exports = {
    listarConcluidas,
    listarAulas,
    concluir,
    desconcluir,
    obterDados
}