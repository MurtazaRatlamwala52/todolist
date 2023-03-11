const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv').config();

// console.log(process.env.password);

const sequelize = new Sequelize('todolist', 'root', process.env.password, {
    host: 'localhost',
    dialect:'mysql',
    logging: false,
})

const users = require('./models/users')(sequelize, DataTypes)
const tasks = require('./models/tasks')(sequelize, DataTypes)

users.hasMany(tasks)
tasks.belongsTo(users)

sequelize.sync({alter: true})
module.exports = {users , tasks}
