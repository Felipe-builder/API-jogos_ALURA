const usuariosRoteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario') 

usuariosRoteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const usuario = new Usuario(dadosRecebidos)
        await usuario.criar()
        res.send(
            JSON.stringify(req.body)
        )
    } catch (erro) {
        res.send(
            JSON.stringify(
                { mensagem: erro.message }
            )
        )
    }
})

usuariosRoteador.get('/', async (req, res) => {
    try {
        const resultados = await TabelaUsuario.listar()
        res.send(
            JSON.stringify(resultados)
        )
    } catch(erro) {
        res.send(
            {mensagem: erro.message}
        )
    }
})

usuariosRoteador.get('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id})
        await usuario.consultarPorId()
        res.send(
            JSON.stringify(usuario)
        )
    } catch(erro) {
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
        res.send(
            JSON.stringify("dados Atualizados")
        )
        res.end()
    } catch (erro) {
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
        res.send(
            JSON.stringify("Dado apagado com sucesso!")
        )
        res.end()
    }catch (erro) {
        res.send(
            {mensagem: erro.message}
        )
    }
})
module.exports = usuariosRoteador