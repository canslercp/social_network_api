const { Schema, model } = require('mongoose');
var moment = require('moment');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionsId: {
            type: Schema.Types.ObjectId,
        },
        reactionsBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTime
        }
    }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTime
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// getter function for createdAt
function formatTime(date) {
   return moment(date).format("MMMM Do YYYY, h:mm:ss a"); 
}

//Virtual property 'reactionCount' that retrieves the length of the thought's reaction array field
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;