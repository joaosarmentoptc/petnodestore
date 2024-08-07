const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


let verifyToken;

if (process.env.NODE_ENV === 'test') {
    verifyToken = require('./tests/helpers/mockAuth');
}
else {
    verifyToken = require('./src/middlewares/auth').verifyToken;
}

const getRoute = (name) => require(`./src/modules/${name}/route`);

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/catalog', getRoute('catalog'));
app.use('/cart', verifyToken, getRoute('cart'));
app.use('/user', getRoute('user'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message });
});


module.exports = app;
