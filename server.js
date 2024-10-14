require('dotenv').config();

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const morgan = require('morgan');

const path = require('path');
const cors = require('cors');

// Initializacion
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// require('./database');

// settings
app.set('views', path.join(__dirname, 'src/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT);

// Middleware
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
)
    // .use(morgan('dev'))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(cors());

// const booksRoute = require('./routes/booksRoute');
const homeRutas = require('./routes/index');

// Routes
// app.use('/api/books', booksRoute);
app.use('/', homeRutas);
// app.use('/contactenos', homeRutas);
// app.use('contactenos', homeRutas);
// app.use('/login', homeRutas);
// app.use('/quienes_somos', homeRutas);

// Static Files
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/icons', express.static(path.join(__dirname, 'src/assets/icons')));
app.use('/images', express.static(path.join(__dirname, 'src/assets/images')));

// Server start
app.listen(app.get('port'), () => {
    console.log('Server running on port ', app.get('port'));
});
