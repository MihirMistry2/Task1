const express = require('express');
const path = require('path');

require('./db/connectDB');
const routes = require('./routers/routes');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, PATCH, POST, GET, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT',
            'POST',
            'PATCH',
            'DELETE',
            'GET',
            'POST'
        );
        return res.status(200).json({});
    }

    next();
});

app.use(express.json());
app.use(express.urlencoded());

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/api/companys', routes);

module.exports = app;
