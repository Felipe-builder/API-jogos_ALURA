const TabelaUsuario = require('./TabelaUsuario')

class Usuario {
    constructor({ id, nome, idade, saldo, dtCriacao, dtAtualizacao , versao}) {
        this.id = id
        this.nome = nome
        this.idade = idade
        this.saldo = saldo
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = TabelaUsuario.inserir({
            nome: this.nome,
            idade: this.idade,
            saldo: this.saldo
        })
        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

    async consultarPorId() {
        const usuarioEncontrado = await TabelaUsuario.consultarPorId(this.id)
        this.nome = usuarioEncontrado.nome
        this.idade = usuarioEncontrado.idade
        this.saldo = usuarioEncontrado.saldo
        this.dtCriacao = usuarioEncontrado.dtCriacao
        this.dtAtualizacao = usuarioEncontrado.dtAtualizacao
        this.versao = usuarioEncontrado.versao
    }

    async atualizar() {
        await TabelaUsuario.consultarPorId(this.id)
        const campos = ['nome', 'idade', 'saldo']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0 ) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar')
        }

        await TabelaUsuario.atualizar(this.id, dadosParaAtualizar)

    }

    deletar() {
        return TabelaUsuario.deletar(this.id)
    }

    validar() {
        const campos = ['nome', 'idade', 'saldo']

        campos.forEach(campo => {
            const valor = this[campo]
            if(!typeof valor !== 'string' || valor.length === 0){
                throw new Error(`O campo "${campo}" está inválido`)
            }
        })
    }
}

module.exports = Usuario