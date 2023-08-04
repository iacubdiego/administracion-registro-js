const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const rememberMe = require('./middlewares/rememberMe');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4002;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const programasRoutes = require('./routes/programasRoutes');
//Aquí llamo a la ruta de las api de movies
const apiProgramasRouter = require('./routes/api/programas')
//Aquí llamo a la ruta de las api de actors
const apiClubesRouter = require('./routes/api/clubes')



// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
}));
app.use(rememberMe);

// Routes
app.use('/', mainRoutes);

app.use('/programas', programasRoutes);

// http://localhost:4000/products
app.use('/products', productsRoutes);

//Aquí creo la colección de mis recursos de movies (APIs)
// app.use('/api/programas',apiProgramasRouter);
app.use('/api/clubes',apiClubesRouter);



// configuarcion de public static
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log("Server on port http://localhost:" + PORT);
});