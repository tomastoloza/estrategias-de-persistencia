const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }) 
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});


// obtiene registros
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});

