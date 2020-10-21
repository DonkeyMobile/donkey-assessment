export {};
const Mongoose = require("mongoose");
const DbConfig = require('../config/db.config')

Mongoose.connect(DbConfig.url, DbConfig.options);

const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Comment', new Schema({
    description: String,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}));
