const path = require('path');
// const db = require('../../database/models');
const fs = require('fs');

// const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const productListPath = path.resolve(__dirname, '../../data/products.json');
const db = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const Programas = db.Programa;


const programasAPIController = {
    'list': (req, res) => {
        db.Programa.findAll() // Promise
            .then(programas => {
                return res.json({
                    code: 200,
                    msg: 'success',
                    data: programas
                });
            })
        ;

    },
    'detail': (req, res) => {
        db.Programa.findByPk(req.params.id)// Promise
            .then(programa => {
                return res.json({
                    code: 200,
                    msg: 'success',
                    data: programa
                });
            })
        ;
    },
    create: async (req, res) => {
        try {
            let programaCreated = await db.Programa.create({
                nombre: req.body.nombre,
                categoria: req.body.categoria,
                // awards: req.body.awards,
                // release_date: req.body.release_date,
                // length: req.body.length,
                // genre_id: req.body.genre_id,
            })// Promise

            return res.status(200).json({
                msg: 'success',
                data: programaCreated
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'error',
                data: error
            });
            
        }
    },
    update: async (req, res) => {
        try {
            let programaId = req.params.id;
    
            let programaUpdated = await db.Programa.update(
                {
                    nombre: req.body.nombre,
                    categoria: req.body.categoria,
                    // awards: req.body.awards,
                    // release_date: req.body.release_date,
                    // length: req.body.length,
                    // genre_id: req.body.genre_id,
                },
                {
                    where: {
                        id: programaId
                    }
                }
            );

            if (!programaUpdated) {
                return res.status(200).json({
                    msg: 'no se pudo actualizar',
                })
            }

            return res.status(200).json({
                msg: 'success',
                data: programaUpdated
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'error', 
                error
            });
        }
    },
    destroy: async (req, res) => {
        try {
            let programaId = req.params.id;

            let programaDeleted = await db.Programa.destroy({
                where: {
                    id: programaId
                }
            });

            return res.status(200).json({
                msg: 'success',
                data: programaDeleted
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'error',
                error
            });
        }
    }
};

module.exports = programasAPIController;