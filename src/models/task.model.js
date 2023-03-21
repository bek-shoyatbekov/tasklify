const { Schema, model, default: mongoose } = require('mongoose');

const taskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        max: [255, "Title must be less than 255"],
        trim: true,
    },
    status: {
        type: String,
        enum: ['done', 'doing', 'undone'],
        default: 'Doing'
    }

})

module.exports = model("Task", taskSchema);