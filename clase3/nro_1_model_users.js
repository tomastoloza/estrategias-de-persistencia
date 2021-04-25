function createSequelize(){
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('playground_clase_3', 'root', 'root123', {
        host: 'localhost', port: '33061',
        dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
}


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const {STRING, Model} = Sequelize;

class Cars extends Model {
}

Cars.init({
    firstName: STRING,
    lastName: STRING
}, {sequelize, modelName: 'users'});


/* crea usuario*/
sequelize.sync()
    .then(() => Cars.create({
        firstName: 'Pedro',
        lastName: 'Rodriguez'
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });


class Fachardo extends Model {
}

Fachardo.init({
    igDelFachardo: STRING
}, {
    sequelize, modelName: 'fachardos'
})

sequelize.sync().then(() => Fachardo.create({igDelFachardo: 'matias.bonillo'}).then(e => {
    console.log(e.toJSON())
}))


Fachardo.update({igDelFachardo: 'tomas.toloza'}, {
        where: {
            igDelFachardo: "matias.bonillo"
        }
    }
).then(r => {
    console.log(r.toString())
})





