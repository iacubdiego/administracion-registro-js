module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario: {
            type: dataTypes.TEXT,
        },
        permiso: {
            type: dataTypes.TEXT,
        },
    };
    let config = {
        tableName: 'usuarios',
        timestamps: false,
    }
    const Usuario = sequelize.define(alias, cols, config); 

    // Club.associate = function (models) {
    //     Club.belongsToMany(models.Programa, { // models.Movie -> Movies es el valor de alias en movie.js
    //         as: "programas",
    //         through: 'club_programa',
    //         foreignKey: 'club _id',
    //         otherKey: 'programa_id',
    //         timestamps: false
    //     })
    // }

    return Usuario
};