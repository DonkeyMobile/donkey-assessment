export {};
const Mongoose = require("mongoose");
const DbConfig = require('../config/db.config')

Mongoose.connect(DbConfig.url, DbConfig.options);

const Schema = Mongoose.Schema;

module.exports = Mongoose.model('File', new Schema({
    type: String,
    data: Buffer,
    size: Number
}));
