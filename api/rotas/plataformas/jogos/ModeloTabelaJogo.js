const Sequelize = require('sequelize')
const instancia = require('../../../banco-de-dados')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('tiro', 'rpg', 'aventura', 'estratégia', 'esporte', 'terror'),
        allowNull: false
    },
    plataforma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ModeloTabelaPlataforma'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'jogos',
    timestamps: true,
    createdAt: 'dtCriacao',
    updatedAt: 'dtAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('jogo', colunas, opcoes)