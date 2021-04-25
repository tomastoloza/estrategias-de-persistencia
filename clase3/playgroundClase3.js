const Sequelize = require('sequelize');

const sequelize = new Sequelize('playground_clase_3', 'root', 'root123', {
    host: 'localhost', port: '33061',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const {STRING, Model, INTEGER} = Sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

class Almacen extends Model {
}

Almacen.init({
    codigo: {type: INTEGER, autoIncrement: true, primaryKey: true},
    lugar: STRING,
    capacidad: INTEGER
}, {sequelize, modelName: 'almacenes'});

sequelize.sync().then(() => Almacen.create({
    lugar: 'Villa Luzuriaga', capacidad: 500
}))