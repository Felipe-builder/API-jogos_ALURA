const ModeloTabelaJogo = require('../rotas/plataformas/jogos/ModeloTabelaJogo') 
const ModeloTabelaUsuario = require('../rotas/usuarios/ModeloTabelaUsuario')

// ModeloTabelaJogo
//     .sync()
//     .then(() => console.log('Tabela criada com sucesso'))
//     .catch(console.log)

ModeloTabelaUsuario
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)