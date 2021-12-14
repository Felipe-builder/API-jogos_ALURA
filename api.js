const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const config = require('config')

app.use(bodyParse.json())

const jogosRoteador = require('./rotas/jogos')
const usuariosRoteado = require('./rotas/usuarios')

app.use('/api/jogos', jogosRoteador)
app.use('/api/usuarios', usuariosRoteado)


app.listen(config.get('api.porta'), () => console.log('API está funcionando!'))