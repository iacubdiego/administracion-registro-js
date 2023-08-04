module.exports = (sequelize, dataTypes) => {
    let alias = 'Programa'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
            titulo: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        año: {
            type: dataTypes.STRING(4),
            allowNull: false
        }
    };
    let config = {
        tableName: 'programas',
        timestamps: false,
    }

    const Programa = sequelize.define(alias,cols,config);

    //     Programa.associate = function (models) {
    // //     Movie.belongsTo(models.Genre, { // models.Genre -> Genres es el valor de alias en genres.js
    // //         as: "genre",
    // //         foreignKey: "genre_id"
    // //     })

    //     Programa.belongsToMany(models.Club, { // models.Actor -> Actors es el valor de alias en actor.js
    //         as: "clubes",
    //         through: 'actor_movie',
    //         foreignKey: 'programa_id',
    //         otherKey: 'club_id',
    //         timestamps: false
    //     })
    // }
    return Programa
};