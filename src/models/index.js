const mongoose = require('mongoose');

console.log('MONGO DB =', process.env.MONGODB_URI);

const connectionString = process.env.MONGODB_URI;
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

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
