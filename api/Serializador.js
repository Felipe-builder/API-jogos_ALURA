const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    serializar (dados) {
        if (this.contentType === 'application/json'){
            return this.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }
}

class SerializadorUsuario extends Serializador {
    constructor(contentType) {
        super()
        this.contentType = contentType
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorUsuario: SerializadorUsuario,
    formatosAceitos: ['application/json']
}