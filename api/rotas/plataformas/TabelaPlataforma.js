const Modelo = require('./ModeloTabelaPlataforma')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar() {
        return Modelo.findAll({ raw: true})
    },
    inserir(dados) {
        return Modelo.create(dados)
    },
    async consultarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado('plataforma') 
        }

        return encontrado
    },
    atualizar(id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            } 
         )
    },
    deletar(id) {
        return Modelo.destroy(
            {
                where: {
                    id: id
                }
            }
        )
    }
}