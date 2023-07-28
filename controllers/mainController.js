const fs = require('fs');
const path = require('path');
const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const userModel = require('../models/UsersModel');

const mainController = {
    index: (req, res) => {
        const user = req.session.user;
        if (user) {
          if (user.isAdmin) {
            // Renderiza la vista de administrador con el menú de productos
            res.render('auth/admin', {
              user,
              menu: productList
            });
          } else {
            // Renderiza la vista de usuario regular con el menú de productos
            res.render('index', {
              user,
              menu: productList
            });
          }
        } else {
          res.render("auth/login");
        }
      },
    detalle: (req, res) => {
        let id = req.params.id;
        let plato = productList.find(product => product.id == id);

        res.render("detalleMenu", { plato });
    },
    login: (req, res) => {
        res.render("auth/login");
        // res.json({
        //     message: "login"
        // });
    },
    profile : (req,res)=>{
        let user = req.session.user;
        if (user) {
            res.render("auth/profile", {
                user
            });
        } else {
        res.render("auth/login", { 
        });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect("/");
    },
    processLogin: (req, res) => {
        try {
            let currentUser = {
                email: req.body.email,
                password: req.body.password
            }
    
            let validate = userModel.validateUser(currentUser);
    
            if (validate) {
                req.session.user = validate;
                if (req.body.remember) {
                    res.cookie(
                        'user', 
                        validate.name, { 
                            maxAge: 1000 * 60 * 60 * 24 * 7 
                        });
                }
                res.redirect('/');// a la ruta
            }
        } catch (error) {
            res.json({
                success: false,
                error: error.message
            });
        }
    },
    register: (req, res) => {
        res.render("auth/register");
    },
    processRegister: (req, res) => {
        let currentUser = req.body;
        let listUsers = userModel.getAll();
        
        const newUser = listUsers.find(user => {
            if (user.email == currentUser.email) {
                res.render("auth/register", { error: "El email ya existe" });
            }
        });

        if (! newUser) {
            userModel.create(currentUser);
            res.redirect("/");
        }
    }
}

module.exports = mainController;