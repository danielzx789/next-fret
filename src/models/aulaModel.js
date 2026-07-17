var database = require("../database/config");

function comparacaoUsuarios(idUsuario){

var instrucaoSql = `SELECT 
						ac.usuario_id id,
                        COUNT(ac.usuario_id)
                        FROM aulas_concluidas ac
                        GROUP BY ac.usuario_id
                        ORDER BY COUNT(ac.usuario_id) DESC;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function listarConcluidas(idUsuario) {

    var instrucaoSql = `SELECT 
                        a.id,
                        a.nome,
                        a.video_url,
                        a.ordem,
                        ac.data_conclusao
                        FROM aulas_concluidas ac
                        JOIN aula a ON ac.aula_id = a.id
                        WHERE ac.usuario_id = ${idUsuario}
                        ORDER BY a.ordem;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarConcluidasPorTempo(idUsuario) {

    var instrucaoSql = `SELECT 
                        COUNT(a.id) total,
                        DATE (ac.data_conclusao) data
                        FROM aulas_concluidas ac
                        JOIN aula a ON ac.aula_id = a.id
                        WHERE ac.usuario_id = ${idUsuario}
                        GROUP BY DATE (ac.data_conclusao)
                        ORDER BY DATE (ac.data_conclusao);`
                        

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarAulas() {

    var instrucaoSql = `SELECT * FROM 
                        aula a
                        ORDER BY a.ordem;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function concluir(idUsuario, idAula) {

    var instrucaoSql = `INSERT INTO aulas_concluidas (usuario_id, aula_id) VALUES (${idUsuario}, ${idAula})`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desconcluir(idUsuario, idAula){

var instrucaoSql = `DELETE FROM aulas_concluidas WHERE usuario_id = ${idUsuario} AND aula_id = ${idAula}`

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

module.exports = {
    listarConcluidas,
    listarAulas,
    concluir,
    desconcluir,
    listarConcluidasPorTempo,
    comparacaoUsuarios
}
