const jogosRoteador = require('express').Router()
const TabelaJogo = require('./TabelaJogo')
const Jogo = require('./Jogo')
const NaoEncontrado = require('../../erros/NaoEncontrado')
const SerializadorJogo = require('../../Serializador').SerializadorJogo

jogosRoteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const jogo = new Jogo(dadosRecebidos)
        await jogo.criar()
        res.status(201)
        const serializador = new SerializadorJogo(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(jogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

jogosRoteador.get('/', async (req, res) => {
    const resultados = await TabelaJogo.listar()
    res.status(200)
    const serializador = new SerializadorJogo(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

jogosRoteador.get('/:idJogo', async (req, res, proximo) => {
    try {
        const id = req.params.idJogo
        const jogo = new Jogo({ id: id})
        await jogo.carregar()
        res.status(200)
        const serializador = new SerializadorJogo(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(jogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

jogosRoteador.put('/:idJogo', async (req, res, proximo) => {
    try {
        const id = req.params.idJogo
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id})
        const jogo = new Jogo(dados)
        await jogo.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

jogosRoteador.delete('/:idJogo', async (req, res, proximo) => {
    try {
        const id = req.params.idJogo
        const jogo = new Jogo({id: id})
        await TabelaJogo.consultarPorId(id)
        await jogo.deletar()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

module.exports = jogosRoteador