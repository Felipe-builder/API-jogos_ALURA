const roteador = require('express').Router()
const TabelaPlataforma = require('./TabelaPlataforma')
const Plataforma = require('./Plataforma')

roteador.get('/', async (req, res) => {
    const plataformas = await TabelaPlataforma.listar();
    res.send(
        JSON.stringify(plataformas)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const plataforma = new Plataforma(dadosRecebidos)
        await plataforma.criar()
        res.status(201)
        res.send(
            JSON.stringify(plataforma)
        )
    } catch(erro) {
        proximo(erro)
    } 
})

roteador.get('/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const plataforma = new Plataforma({id: id})
        await plataforma.carregar()
        res.status(200)
        res.send(
            JSON.stringify(plataforma)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const plataforma = new Plataforma(dados)
        await plataforma.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const plataforma = new Plataforma({id: id})
        await TabelaPlataforma.consultarPorId(id)
        await plataforma.deletar()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

const roteadorJogos = require('./jogos')
roteador.use('/:idPlataforma/jogos', roteadorJogos)

module.exports = roteador