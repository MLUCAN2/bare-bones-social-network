// Create the schema for the thoughts
// This needs to include the actual thoughts, date created, references to the user, and reactions (replies) 

const {Schema, model, Types}= require('mongoose');

const thoughtSchema = new Schema({
    thoughtText:{
        type:String,
        required:true,
        minlength:1,
        maxlength:280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleDateString()
    },
    username:{
        type:String,
        required:true
    },
    reactions: [reactionSchema]
});

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default:()=> new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength:280
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{ 
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString()
    }
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
