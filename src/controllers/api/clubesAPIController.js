// const path = require('path');
//const db = require('../../database/models');
// const sequelize = db.sequelize;
// const { Op } = require("sequelize");
// const moment = require('moment');

const db = require('../../database/models');
const sequelize = db.sequelize;

const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const moment = require('moment');

// const clubListPath = path.resolve(__dirname, '../../data/clubes.json');
// const db = JSON.parse(fs.readFileSync(clubListPath, 'utf8'));

//Aqui tienen otra forma de llamar a cada uno de los modelos
// const Programas = db.Programas;
// const Clubes = db.Clubes;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const clubesAPIController = {
    'list': (req, res) => {
        db.Club.findAll() // Promise
            .then(clubes => {
                return res.render("api/clubes", {
                    clubes: clubes
                });
            })
        ;

    },
    // 'list': (req, res) => {
    //     db.Club.findAll()
    //     .then(clubes => {
    //         let respuesta = {
    //             meta: {
    //                 status : 200,
    //                 total: clubes.length,
    //                 url: 'api/clubes'
    //             },
    //             data: clubes
    //         }
    //             res.json(respuesta);
    //         })
    // },
    
    'detail': (req, res) => {
        db.Club.findByPk(req.params.id)
            .then(club => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: club.length,
                        url: '/api/club/:id'
                    },
                    data: club
                }
                res.json(respuesta);
            });
    },
    'clubProgramas': (req, res) => {
        db.Club.findByPk(req.params.id,{
            include: ['programas']
        })
            .then(club => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: club.length,
                        url: '/api/club/:id'
                    },
                    data: club
                }
                res.json(respuesta);
            });
    },
    create: (req,res) => {
        Clubes
        .create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/clubes/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/clubes/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let clubId = req.params.id;
        Clubes.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id,
            },
            {
                where: {id: clubId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/clubes/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/clubes/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let actorId = req.params.id;
        Clubes
        .destroy({where: {id: clubId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/clubes/delete/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/clubes/delete/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    
}

module.exports = clubesAPIController;