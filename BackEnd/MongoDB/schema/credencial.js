const mongoose = require('mongoose')

const microcredencialSchema = new mongoose.Schema({}, { strict: false, versionKey: false });
module.exports = mongoose.model('Microcredencial', microcredencialSchema);