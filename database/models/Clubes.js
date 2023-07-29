module.exports = (sequelize, dataTypes) => {
    let alias = 'Club';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        favorite_movie_id: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
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