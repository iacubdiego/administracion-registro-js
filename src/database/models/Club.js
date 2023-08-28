module.exports = (sequelize, dataTypes) => {
    let alias = 'Club';
    let cols = {
        id: {
            type: dataTypes.STRING(100),
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.STRING(100),
        },
        cuit: {
            type: dataTypes.STRING(100),
        },
        provincia: {
            type: dataTypes.STRING(100),
        },
        municipio: {
            type: dataTypes.STRING(100),
        },
        socios: {
            type: dataTypes.STRING(100),
        },
        subsidios: {
            type: dataTypes.STRING(100),
        },
        documentacion: {
            type: dataTypes.STRING(100),
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