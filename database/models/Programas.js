module.exports = (sequelize, dataTypes) => {
    let alias = 'Programa'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        nombre: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        categoria: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        }
        // ,
        // awards: {
        //     type: dataTypes.BIGINT(10).UNSIGNED,
        //     allowNull: false
        // },
        // release_date: {
        //     type: dataTypes.DATEONLY,
        //     allowNull: false
        // },
        // length: dataTypes.BIGINT(10),
        // genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Programa = sequelize.define(alias,cols,config);

        Programa.associate = function (models) {
    //     Movie.belongsTo(models.Genre, { // models.Genre -> Genres es el valor de alias en genres.js
    //         as: "genre",
    //         foreignKey: "genre_id"
    //     })

        Programa.belongsToMany(models.Club, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "clubes",
            through: 'actor_movie',
            foreignKey: 'programa_id',
            otherKey: 'club_id',
            timestamps: false
        })
    }
    return Programa
};