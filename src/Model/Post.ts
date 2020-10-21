export {};
const Mongoose = require("mongoose");
const DbConfig = require('../config/db.config')
const FileModel = require('./File');

Mongoose.connect(DbConfig.url, DbConfig.options);

const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Post', new Schema({
    description: String,
    date: Date,
    attachments: [FileModel.schema],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}));
