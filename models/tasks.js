module.exports = (sequelize, Datatypes) => {
    const tasks = sequelize.define('tasks', {
        task: {
            type: Datatypes.STRING,
            allowNull: false
        },
        description: {
            type: Datatypes.STRING,
        },Start: {
            type: Datatypes.DATE,
        },End: {
            type: Datatypes.DATE,
        },Status: {
            type: Datatypes.ENUM,
            values: ['pending' , 'complete'],
            allowNull: false,
            defaultValue: 'pending'
        },Remarks: {
            type: Datatypes.ENUM,
            values: ['On time', 'Late', 'pending'],
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
    timestamps: false
})
return tasks
}