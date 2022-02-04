class DadosNaoFornecidos extends Error {
    constructor () {
        super('Não foram fornecidos dados apra atualizar!')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos