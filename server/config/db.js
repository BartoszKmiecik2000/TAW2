const mongoose = require('mongoose');

const mongoDB_Url = process.env.MongoDB_Url;

mongoose.connect(mongoDB_Url);
mongoose.connection.on('connected', () => {
    console.log('Connected to database.');
});
mongoose.connection.on('error', (e) => {
    console.log('error');
    console.log(e);
});