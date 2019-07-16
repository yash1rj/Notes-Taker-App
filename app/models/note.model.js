const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    tile: String,
    content: String
}, {
    timestamps: true 
});

module.exports = mongoose.model('Note', NoteSchema);
