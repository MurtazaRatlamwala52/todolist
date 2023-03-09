module.exports = (sequelize, Datatypes) => {
    const users = sequelize.define('users', {
        task: {
            type: Datatypes.STRING,
            allownull: false
        },
        startDate: {
            type: Datatypes.STRING,
            allownull: false,
        },EndDate: {
            type: Datatypes.STRING,
            allownull: false
    }
}, {
    timestamps: false
})
return users
}