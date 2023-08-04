module.exports = (sequelize, dataTypes) => {
    let alias = 'Club';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: dataTypes.TEXT,
        },
        descripcion: {
            type: dataTypes.TEXT,
        },
        categoria: {
            type: dataTypes.TEXT,
        }
    };
    let config = {
        tableName: 'clubes',
        timestamps: false,
    }
    const Club = sequelize.define(alias, cols, config); 

    Club.associate = function (models) {
        Club.belongsToMany(models.Programa, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "programas",
            through: 'club_programa',
            foreignKey: 'club _id',
            otherKey: 'programa_id',
            timestamps: false
        })
    }

    return Club
};