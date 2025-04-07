const mongoose = require('mongoose')

const microcredencialSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Microcredencial', microcredencialSchema);