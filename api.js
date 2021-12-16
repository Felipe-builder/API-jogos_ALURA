const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

app.use(bodyParse.json())

const jogosRoteador = require('./rotas/jogos')
const usuariosRoteado = require('./rotas/usuarios')

app.use('/api/jogos', jogosRoteador)
app.use('/api/usuarios', usuariosRoteado)
app.use((erro, req, res, proximo) => {
    let status = 500
    if (erro instanceof NaoEncontrado) {
        status = 404
    }
    
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }
    
    res.status(status)

    res.send(
        {
            mensagem: erro.message,
            id: erro.idErro
        
        }
    )
})

app.listen(config.get('api.porta'), () => console.log('API está funcionando!'))