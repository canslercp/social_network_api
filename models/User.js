const { Schema, model } = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
                }
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId, ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId, ref: 'User'
        }]
});

// Virtual property 'friendCount' that gets the amount of comments per post
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
}
);

// Initialize User model
const User = model('user', userSchema);

module.exports = User;