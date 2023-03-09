// const { Sequelize } = require("sequelize");
const bcrypt = require('bcrypt')

module.exports = (sequelize, Datatypes) => {
    const users = sequelize.define('users', {
        name: {
            type: Datatypes.STRING,
            allownull: false
        },
        email: {
            type: Datatypes.STRING,
            allownull: false,
            validate: {
                isEmail: true
            }
        },password: {
            type: Datatypes.STRING,
            allownull: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, 10))
            }
    }
}, {
    timestamps: false
})
return users
}