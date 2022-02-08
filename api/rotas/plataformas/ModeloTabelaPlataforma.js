const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    site: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTablename: true,
    tableName: 'plataformas',
    timestamps: true,
    createdAt: 'dtCriacao',
    updatedAt: 'dtAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('plataforma', colunas, opcoes)