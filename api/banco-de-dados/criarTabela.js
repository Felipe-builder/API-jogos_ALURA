const modelos = [
    require('../rotas/plataformas/ModeloTabelaPlataforma'),
    require('../rotas/plataformas/jogos/ModeloTabelaJogo'),
    require('../rotas/usuarios/ModeloTabelaUsuario')
]

async function criarTabelas() {
    for (let contador = 0; contador < modelos.length; contador++) {
        const modelo = modelos[contador]
        await modelo
            .sync()
            .then(() => console.log('Tabela criada com sucesso'))
            .catch(console.log)
    }
}

criarTabelas()