const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String,
        trim: true
    },
    imagelink: {
        type: String,
        trim: true
    },
    cusine: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task