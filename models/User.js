// create the schema for the user
// We need to include references to the thoughts and friends (users)

const {Schema, model}= require('mongoose');
const thoughtSchema= require('./Thought');

const userSchema= new Schema({
    username:{
        type: String,
        unique: true,
        trimmed: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]    
},

// When we send a response to the user it includes all of the virtual properties we just made above
{
    toJSON: {
        virtuals: true,
    },
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User= model ('user', userSchema);

module.exports= User;

