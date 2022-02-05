const NaoEncontrado = require('../../erros/NaoEncontrado')
const Modelo = require('./ModeloTabelaUsuario')

module.exports = {
    listar() {
        return Modelo.findAll({ raw: true})
    },
    inserir(usuario) {
        return Modelo.create(usuario)
    },
    async consultarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!encontrado) {
            throw new NaoEncontrado("Usuário")
        }

        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },
    deletar(id){
        return Modelo.destroy({
            where: {id: id}
        })
    }

}