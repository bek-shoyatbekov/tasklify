const { Schema, model, default: mongoose } = require('mongoose');

const taskSchema = new Schema({
    owner: {
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
        enum: ['Done', 'Doing', 'Undone', 'Deleted'],
        default: 'Doing'
    }

})

module.exports = model("Task", taskSchema);