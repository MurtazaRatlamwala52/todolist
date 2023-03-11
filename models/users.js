// const { Sequelize } = require("sequelize");
const bcrypt = require('bcrypt')

module.exports = (sequelize, Datatypes) => {
    const users = sequelize.define('users', {
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },password: {
            type: Datatypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, 10))
            }
        },role: {
            type: Datatypes.ENUM,
            values: ['Manager', 'Employee'],
            allowNull:  false,
            defaultValue: 'Employee'
        },token: {
            type: Datatypes.STRING
        }
}, {
    timestamps: false
})
return users
}