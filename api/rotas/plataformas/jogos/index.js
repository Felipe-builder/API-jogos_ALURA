const roteador = require('express').Router({ mergeParams: true})
const TabelaJogo = require('./TabelaJogo')
const Jogo = require('./Jogo')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
const SerializadorJogo = require('../../../Serializador').SerializadorJogo

roteador.post('/', async (req, res, proximo) => {
    try {
        const idPlataforma = req.plataforma.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { plataforma: idPlataforma })
        const jogo = new Jogo(dados)
        await jogo.criar()
        res.status(201)
        const serializador = new SerializadorJogo(
            res.getHeader('Content-Type'), 
            [ 'categoria', 'plataforma', 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.set('Etag', jogo.versao)
        const timestamp = (new Date(jogo.dtAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/plataformas/${jogo.plataforma}/jogos/${jogo.id}`)
        res.send(
            serializador.serializar(jogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})



roteador.get('/', async (req, res) => {
    console.log(req.plataforma.id)
    const resultados = await TabelaJogo.listar(req.params.idPlataforma)
    res.status(200)

    const serializador = new SerializadorJogo(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.get('/:idJogo', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.idJogo,
            plataforma: req.plataforma.id
        }
        const jogo = new Jogo(dados)
        await jogo.carregar()
        res.status(200)
        const serializador = new SerializadorJogo(
            res.getHeader('Content-Type'), 
            [ 'categoria', 'plataforma', 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.set('Etag', jogo.versao)
        const timestamp = (new Date(jogo.dtAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.send(
            serializador.serializar(jogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idJogo', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.idJogo,
            plataforma: req.plataforma.id
        }
        const jogo = new Jogo(dados)
        await jogo.carregar()
        res.status(200)
        const serializador = new SerializadorJogo(
            res.getHeader('Content-Type'), 
            [ 'categoria', 'plataforma', 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.set('Etag', jogo.versao)
        const timestamp = (new Date(jogo.dtAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.status(200)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:idJogo', async (req, res, proximo) => {
    try {
        const dados = Object.assign(
            {},
            req.body,
            {
                id: req.params.idJogo,
                plataforma: req.plataforma.id
            }
        )
        const jogo = new Jogo(dados)
        await jogo.atualizar()
        await jogo.carregar()
        res.set('Etag', jogo.versao)
        const timestamp = (new Date(jogo.dtAtualizacao)).getTime()
        res.set('Last-Modified', timestamp)
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idJogo', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.idJogo,
            plataforma: req.plataforma.id
        }
        const jogo = new Jogo(dados)
        await TabelaJogo.consultarPorId(dados.id, dados.plataforma)
        await jogo.deletar()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

module.exports = roteador