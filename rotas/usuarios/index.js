const usuariosRoteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario') 

usuariosRoteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const usuario = new Usuario(dadosRecebidos)
        await usuario.criar()
        res.status(201)
        res.send(
            JSON.stringify(req.body)
        )
    } catch (erro) {
        res.status(400)
        res.send(
            JSON.stringify(
                { mensagem: erro.message }
            )
        )
    }
})

usuariosRoteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

usuariosRoteador.get('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id})
        await usuario.consultarPorId()
        res.status(200)
        res.send(
            JSON.stringify(usuario)
        )
    } catch(erro) {
        res.status(404)
        res.send(
            {mensagem: erro.message}
        )
    }
})

usuariosRoteador.put('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const usuario = new Usuario(dados)
        await usuario.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.status(404)
        res.send(
            {mensagem: erro.message}
        )
    }
})

usuariosRoteador.delete('/:idUsuario', async (req, res) => {
    try{
        const id = req.params.idUsuario
        const usuario = new Usuario({id: id})
        await usuario.consultarPorId()
        await usuario.deletar()
        res.status(204)
        res.end()
    }catch (erro) {
        res.status(404)
        res.send(
            {mensagem: erro.message}
        )
    }
})
module.exports = usuariosRoteador