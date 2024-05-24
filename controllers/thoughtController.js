const { Thought, User }= require('../models')

module.exports= {
    // GET Routes for all thoughts
    async getThoughts (req,res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err){
            res.status(500).json({message: 'Could not find thoughts'})
        }
    },
    // GET Routes for one thought
    async getSingleThought(req,res){
        try{
            const thoughts= await Thought.findOne({_id:req.params.thoughtId})
            res.json(thoughts);
        }
        catch (err){
            res.status(500).json({message: 'Could not find thought'})
        }
    },
    // POST Routes for one thought and update the users thoughts 
    async createThought(req,res){
        try{
            const thought = await Thought.create(req.body);
            const user= await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id } },
                { new: true, runValidators: true }
            );
            if (!user){
                await Thought.findOneAndDelete({_id: thought._id})
                return res.status(404).json({message:'Could not find user'})
            }
            res.json(thought);
        }
        catch (err){
            res.status(500).json({message: 'Could not create thought'})
            console.log('Could not create thought', err);
        }
    },
    // PUT Routes for one thought
    async updateThought(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                req.body,
                {new:true}
            );
            if (!thought){
                return res.status(404).json({message:'Could not find thought'})
            }
            res.json(thought);
        }
        catch (err){
            res.status(500).json({message: 'Could not update thought'})
            console.log('Could not update thought', err);
        }
    },
    // DELETE Routes for one thought
    async deleteThought(req,res){
        try{
            const thought = await Thought.findOneAndDelete({_id:req.params.thoughtId});
            if (!thought){
                return res.status(404).json({message:'Could not find thought'})
            }
            res.json(thought);
        }
        catch (err){
            res.status(500).json({message: 'Could not delete thought'})
            console.log('Could not delete thought', err);
        }
    },
    // POST Route to add reaction to the thought
    async addReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$push:{reactions:req.body}},
                {new:true}
            );
            if (!thought){
                return res.status(404).json({message:'Could not find thought'})
            }
            res.json(thought);
        }
        catch (err){
            res.status(500).json({message: 'Could not add reaction'})
            console.log('Could not add reaction', err);
        }
    },
    // Delete reaction from the thought
    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$pull:{reactions:req.body}},
                {new:true}
            );
            if (!thought){
                return res.status(404).json({message:'Could not find thought'})
            }
            res.json(thought);
        }
        catch (err){
            res.status(500).json({message: 'Could not delete reaction'})
            console.log('Could not delete reaction', err);
        }
    }
};