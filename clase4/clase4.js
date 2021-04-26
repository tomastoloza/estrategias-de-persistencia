const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {
    host: '', port: '',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Model = Sequelize.Model;

class Student extends Model {
}

Student.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    },
}, {
    sequelize,
    modelName: 'student'
});


function insertStudent(firstName, lastName) {
    sequelize.sync()
        .then(() => Student.create({
            firstName: firstName,
            lastName: lastName
        }))
        .then(user => {
            console.log(user.toJSON());
        });
}


// 1) Inserción y actualización de un registro.

insertStudent('Pedro', "Rodriguez")

Student.update({firstName: 'Pedro Alberto'}, {
    where: {
        firstName: 'Pedro',
        lastName: 'Rodriguez'
    }
}).then(user => console.log("updated -> " + user))

// 2) inserción y eliminación de un registro.

function insertAndDestroy() {
    insertStudent("Pedro", "Martinez")
    Student.destroy({where: {firstName: "Pedro", lastName: "Martinez"}})
}


// 3) inserción y actualización de varios registros.

function insertStudentsAndGetAll(students) {
    students.forEach(value => insertStudent(value.get("firstName"), value.get("lastName")))

    Student.findAll().then(student => {
        console.log("All users:", JSON.stringify(student, null, 10));
    });
}

let students = [new Map().set("firstName", "Marcelo").set("lastName", "Rodriguez"),
    new Map().set("firstName", "Nicolas").set("lastName", "Gomez"),
    new Map().set("firstName", "Matias").set("lastName", "Castillo")]
insertStudentsAndGetAll(students)