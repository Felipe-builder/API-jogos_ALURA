const roteador = require('express').Router()

roteador.get('/', (req, res) => {
    res.send(
        JSON.stringify('OK')
    )
})

const roteadorJogos = require('./jogos')
roteador.use('/:idPlataformas', roteadorJogos)

module.exports = roteador