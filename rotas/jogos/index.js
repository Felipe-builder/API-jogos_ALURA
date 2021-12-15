const jogosRoteador = require('express').Router()
const TabelaJogo = require('./TabelaJogo')
const Jogo = require('./Jogo')

jogosRoteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        // if(!req.body.nome || !req.body.plataforma) {
        //     throw new Error('Campos inválidos!')
        // }
        const jogo = new Jogo(dadosRecebidos)
        await jogo.criar()
        res.status(201)
        res.send(
            JSON.stringify(req.body)
        )
    } catch (erro) {
        res.status(400)
        res.send(JSON.stringify({ mensagem: erro.message }))
    }
})

jogosRoteador.get('/', async (req, res) => {
    const resultados = await TabelaJogo.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

jogosRoteador.get('/:idJogo', async (req, res) => {
    try {
        const id = req.params.idJogo
        const jogo = new Jogo({ id: id})
        await jogo.carregar()
        res.status(200)
        res.send(
            JSON.stringify(jogo)
        )
    } catch (erro) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

jogosRoteador.put('/:idJogo', async (req, res) => {
    try {
        const id = req.params.idJogo
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id})
        const jogo = new Jogo(dados)
        await jogo.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

jogosRoteador.delete('/:idJogo', async (req, res) => {
    try {
        const id = req.params.idJogo
        const jogo = new Jogo({id: id})
        await TabelaJogo.consultarPorId(id)
        await jogo.deletar()
        res.status(204)
        res.end()
    } catch(erro) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = jogosRoteador