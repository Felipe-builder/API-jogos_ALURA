const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')
const NaoEncontrado = require('../../erros/NaoEncontrado')
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
        const resultado = await TabelaUsuario.inserir({
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
        const dadosParaAtualizar = {}

        if (typeof this.nome === 'string' && this.nome.length > 0){
            dadosParaAtualizar.nome = this.nome
        }

        if (typeof this.idade === 'number' && this.idade > 0) {
            dadosParaAtualizar.idade = this.idade
        }

        if (typeof this.saldo === 'number' && this.saldo >= 0) {
            dadosParaAtualizar.saldo = this.saldo
        }

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaUsuario.atualizar(this.id, dadosParaAtualizar)

    }

    deletar() {
        return TabelaUsuario.deletar(this.id)
    }

    validar() {
        if(typeof this.nome !== 'string' || this.nome.length === 0) {
            throw new CampoInvalido('nome')
        }

        if(typeof this.idade !== 'number' || this.idade === 0) {
            throw new CampoInvalido('idade')
        }

        if(typeof this.saldo !== 'number' || this.saldo < 0) {
            throw new CampoInvalido('saldo')
        }

    }
}

module.exports = Usuario