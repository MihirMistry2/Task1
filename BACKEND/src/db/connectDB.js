const mongoose = require('mongoose');

const URL = 'mongodb://localhost/companyDB';

mongoose
    .connect(URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connection to companyDB is successful.');
    })
    .catch((err) => console.log('Connection to companyDB is failed.'));
