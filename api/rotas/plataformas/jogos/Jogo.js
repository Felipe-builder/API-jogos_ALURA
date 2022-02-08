const { Error } = require('sequelize/dist')
const CampoInvalido = require('../../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos')
const TabelaJogo = require('./TabelaJogo')

class Jogo {
    constructor ({ id, nome, preco, categoria, plataforma, dtCriacao, dtAtualizacao , versao}) {
        this.id = id
        this.nome = nome
        this.preco = preco
        this.categoria = categoria
        this.plataforma = plataforma
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar () {
        this.validar()
        const resultado = await TabelaJogo.inserir({
            nome: this.nome,
            preco: this.preco,
            categoria: this.categoria,
            plataforma: this.plataforma
        })

        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const jogoEncontrado = await TabelaJogo.consultarPorId(this.id)
        this.nome = jogoEncontrado.nome
        this.preco = jogoEncontrado.preco
        this.categoria = jogoEncontrado.categoria
        this.plataforma = jogoEncontrado.plataforma
        this.dtCriacao = jogoEncontrado.dtCriacao
        this.dtAtualizacao = jogoEncontrado.dtAtualizacao
        this.versao = jogoEncontrado.versao
    }

    async atualizar() {
        await TabelaJogo.consultarPorId(this.id)
        const campos = ['nome', 'categoria', 'plataforma']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })

        if(typeof this.preco === 'number' && this.preco > 0) {
            dadosParaAtualizar.preco = this.preco;
        }

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaJogo.atualizar(this.id, dadosParaAtualizar)
    }

    deletar(){
        return TabelaJogo.deletar(this.id)
    }

    validar() {
        const campos = ['nome', 'categoria', 'plataforma']

        campos.forEach(campo => {
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })

        if(typeof this.preco !== 'number' || this.preco.length === 0) {
            throw new CampoInvalido('preco');
        }
    }
}

module.exports = Jogo