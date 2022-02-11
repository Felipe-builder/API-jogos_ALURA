const Modelo = require('./ModeloTabelaJogo')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

module.exports = {
    listar (idPlataforma) {
        return Modelo.findAll({
                where: { 
                    plataforma: idPlataforma
                },
            raw: true 
        })
    },
    inserir (dados) {
        return Modelo.create(dados)
    },
    async consultarPorId(id, idPlataforma) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id,
                plataforma: idPlataforma
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado('Jogo')
        }

        return encontrado
    },
    atualizar (dadosDoJogo, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoJogo
            }
        )
    },
    deletar(id, idPlataforma){
        return Modelo.destroy(
            {
                where: {
                    id: id,
                    plataforma: idPlataforma
                }
            }
        )
    }
}