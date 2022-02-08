const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')
const NaoEncontrado = require('../../erros/DadosNaoFornecidos')
const TabelaPlataforma = require('./TabelaPlataforma')

class Plataforma {
    constructor({id, nome, site, dtCriacao, dtAtualizacao, versao}) {
        this.id = id
        this.nome = nome
        this.site = site
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar(){
        this.validar()
        const resultado = await TabelaPlataforma.inserir({
            nome: this.nome,
            site: this.site
        })
        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

    async carregar(){
        const encontrado = await TabelaPlataforma.consultarPorId(this.id)
        this.nome = encontrado.nome
        this.site = encontrado.site
        this.dtCriacao = encontrado.dtCriacao
        this.dtAtualizacao = encontrado.dtAtualizacao
        this.versao = encontrado.versao
    }

    validar() {
        const campos = ['nome', 'site']
        campos.forEach(campo => {
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo)
            }
        })
    }

    async atualizar() {
        await TabelaPlataforma.consultarPorId(this.id)
        const campos = ['nome', 'site']
        const dadosParaAtualizar = {}
        campos.forEach(campo => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos()
        }

        await TabelaPlataforma.atualizar(this.id, dadosParaAtualizar)
    }

    deletar(){
        return TabelaPlataforma.deletar(this.id)
    }
}

module.exports = Plataforma