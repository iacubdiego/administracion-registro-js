const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Programas = db.Programa;
const Clubes = db.Club;

console.log(Programas)

const programasController = {
    'list': (req, res) => {
        db.Programa.findAll({
            // include: ['genre']
        })
            .then(programas => {
                res.render('programas', {programas})
            })
    },
    'detail': (req, res) => {
        db.Programa.findByPk(req.params.id,
            {
                // include : ['genre']
            })
            .then(programa => {
                res.render('programasDetail.ejs', {programa});
            });
    },
    'new': (req, res) => {
        db.Programa.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(programas => {
                res.render('newestMovies', {programas});
            });
    },
    // 'recomended': (req, res) => {
    //     db.Programa.findAll({
    //         // include: ['genre'],
    //         where: {
    //             rating: {[db.Sequelize.Op.gte] : 8}
    //         },
    //         order: [
    //             ['rating', 'DESC']
    //         ]
    //     })
    //         .then(movies => {
    //             res.render('recommendedMovies.ejs', {movies});
    //         });
    // },
    //Aqui dispongo las rutas para trabajar con el CRUD
    // add: function (req, res) {
    //     let promClubes = Clubes.findAll();
        
    //     Promise
    //     .all([promGenres, promActors])
    //     .then(([allGenres, allActors]) => {
    //         return res.render(path.resolve(__dirname, '..', 'views',  'moviesAdd'), {allGenres,allActors})})
    //     .catch(error => res.send(error))
    // },
    create: function (req,res) {
        Programas
        .create(
            {
                nombre: req.body.nombre,
                categoria: req.body.categoria,
                // awards: req.body.awards,
                // release_date: req.body.release_date,
                // length: req.body.length,
                // genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.redirect('/programas')})            
        .catch(error => res.send(error))
    },
    edit: function(req,res) {
        let programaId = req.params.id;
        let promProgramas = Programas.findByPk(programaId,{include: ['clubes']});
        // let promGenres = Genres.findAll();
        let promClubes = Clubes.findAll();
        Promise
        .all([promProgramas, /*promGenres*/, promClubes])
        .then(([Programa, allClubes]) => {
            Programa.release_date = moment(Programa.release_date).format('L');
            return res.render(path.resolve(__dirname, '..', 'views',  'programasEdit'), {Programa,allClubes})})
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        let programaId = req.params.id;
        Programas
        .update(
            {
                nombre: req.body.nombre,
                categoria: req.body.categoria,
                // awards: req.body.awards,
                // release_date: req.body.release_date,
                // length: req.body.length,
                // genre_id: req.body.genre_id
            },
            {
                where: {id: programaId}
            })
        .then(()=> {
            return res.redirect('/programas')})            
        .catch(error => res.send(error))
    },
    delete: function (req,res) {
        let programaId = req.params.id;
        Programas
        .findByPk(programaId)
        .then(Programa => {
            return res.render(path.resolve(__dirname, '..', 'views',  'programasDelete'), {Programa})})
        .catch(error => res.send(error))
    },
    destroy: function (req,res) {
        let programaId = req.params.id;
        Programas
        .destroy({where: {id: programaId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/programas')})
        .catch(error => res.send(error)) 
    }
}

module.exports = programasController;