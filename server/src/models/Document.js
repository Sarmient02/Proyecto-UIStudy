const mongoose = require('mongoose');

const Schema = mongoose.Schema

const documentSchema = new Schema({
    id_user: {
        type: String,
        required: true
    },
    file: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    id_carrera: {
        type: String,
        required: false
    },
    id_materia: {
        type: String,
        required: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Document', documentSchema, 'documents');