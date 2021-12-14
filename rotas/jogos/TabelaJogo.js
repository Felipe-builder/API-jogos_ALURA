const Modelo = require('./ModeloTabelaJogo')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir (jogo) {
        return Modelo.create(jogo)
    },
    async consultarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('Jogo não encontrado!')
        }

        return encontrado
    },
    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id}
            }
        )
    },
    deletar(id){
        return Modelo.destroy(
            {
                where: {id: id}
            }
        )
    }
}