const usuariosRoteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario') 
const SerializadorUsuario = require('../../Serializador').SerializadorUsuario

usuariosRoteador.post('/', async (req, res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const usuario = new Usuario(dadosRecebidos)
        await usuario.criar()
        res.status(201)
        const serializador = new SerializadorUsuario(
            res.getHeader('Content-Type'),
            [ 'saldo', 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.send(
            serializador.serializar(usuario)
        )
    } catch (erro) {
        proximo(erro)
    }
})

usuariosRoteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.status(200)
    const serializador = new SerializadorUsuario(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

usuariosRoteador.get('/:idUsuario', async (req, res, proximo) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id})
        await usuario.consultarPorId()
        res.status(200)
        const serializador = new SerializadorUsuario(
            res.getHeader('Content-Type'),
            [ 'saldo', 'dtCriacao', 'dtAtualizacao', 'versao' ]
        )
        res.send(
            serializador.serializar(usuario)
        )
    } catch(erro) {
        proximo(erro)
    }
})

usuariosRoteador.put('/:idUsuario', async (req, res, proximo) => {
    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const usuario = new Usuario(dados)
        await usuario.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

usuariosRoteador.delete('/:idUsuario', async (req, res, proximo) => {
    try{
        const id = req.params.idUsuario
        const usuario = new Usuario({id: id})
        await usuario.consultarPorId()
        await usuario.deletar()
        res.status(204)
        res.end()
    }catch (erro) {
        proximo(erro)
    }
})
module.exports = usuariosRoteador