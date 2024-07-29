const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;
const configOptions = { };

mongoose.connect(connectionString, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    User: require('./User'),
    Task: require('./Task'),
    Note: require('./Note'),
    WorkTime: require('./WorkTime'),
    Event: require('./Event'),
    List: require('./List'),
};
