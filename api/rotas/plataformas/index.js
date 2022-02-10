const roteador = require('express').Router()
const TabelaPlataforma = require('./TabelaPlataforma')
const Plataforma = require('./Plataforma')
const SerializadorPlataforma = require('../../Serializador').SerializadorPlataforma

roteador.get('/', async (req, res) => {
    const plataformas = await TabelaPlataforma.listar();
    const serializador = new SerializadorPlataforma(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(plataformas)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const plataforma = new Plataforma(dadosRecebidos)
        await plataforma.criar()
        const serializador = new SerializadorPlataforma(
            res.getHeader('Content-Type'),
            [ 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.status(201)
        res.send(
            serializador.serializar(plataforma)
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
        const serializador = new SerializadorPlataforma(
            res.getHeader('Content-Type'),
            ['site', 'dtCriacao', 'dtAtualizacao', 'versao']
        )
        res.send(
            serializador.serializar(plataforma)
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
const verificarPlataforma = async (req, res, proximo) => {
    try {
        const id = req.params.idPlataforma
        const plataforma = new Plataforma({id: id})
        await plataforma.carregar()
        req.plataforma = plataforma
    } catch (erro) {
        proximo(erro)
    }
}
roteador.use('/:idPlataforma/jogos', verificarPlataforma, roteadorJogos)

module.exports = roteador