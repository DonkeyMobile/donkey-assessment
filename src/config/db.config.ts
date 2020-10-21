module.exports = {
    url: 'mongodb://db:27017/test',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        user: 'root',
        pass: 'root',
        authSource: 'admin'
    }
}
