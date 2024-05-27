// In the controller we want to pull the information from our database and send it to the user making the request.
// In this controller we want 
// Import our models
const {User,Thought}= require('../models');



module.exports={
    // GET Routes for user(s)
    async getUsers(req, res){
        try{
            const users= await User.find();
            console.log('All Users', users)
            res.json (users);
        }
        catch (err){
            res.status(500).json({message: 'Could not find users'})
            console.log('Could not find users');
        }
    },
    // GET Routes for single user by id
    async getSingleUser (req, res){
        try{
            const userId= await User.findOne({_id:req.params.userId})
            .populate('thoughts')
            .populate('friends')
            res.json(user);
        }
        catch (err){
            res.status(500).json({message: 'Could not find user'})
            console.log('Could not find user');
        }
    },
    // POST Routes for user
    async createUser (req, res){
        try{
            const user= await User.create(req.body);
            res.json(user);
        }
        catch (err){
            res.status(500).json({message: 'Could not create user'})
            console.log('Could not create user');
        }
    },
    // PUT Routes for user
    async updateUser (req, res){
        try{
            const user= await User.findOneAndUpdate({_id:req.params.userId}, req.body, {new:true})
            res.json(user);
        }
        catch (err){
            res.status(500).json({message: 'Could not update user'})
            console.log('Could not update user');
        }
    },
    // DELETE Route for user
    async deleteUser (req, res){
        try{
            const user= await User.findOneAndDelete({_id:req.params.userId})
            if(!user){
                return res.status(404).json({message: 'Could not find user'});
            }
        }
        catch (err){
            res.status (500)({message: 'Could not delete user'});
            console.log('Could not delete user');
        }
    },
    // PUT Route to add friend
    async addFriend(req, res){
        try{
            const user= await User.findOneAndUpdate(
                {_id:req.params.userId}, 
                {$push:{friends:req.params.friendId}}, 
                {new:true});
            if (!user){
                return res.status(404).json({message: 'Could not find user'});
            }
            res.json(user);
            console.log('Added friend');
        }
        catch (err){
            res.status (500)({message: 'Could not add friend'});
            console.log('Could not add friend');
        }
    },
    // DELETE Route to remove friend
    async removeFriend(req, res){
        try{
            const user= await User.findOneAndUpdate(
                {_id:req.params.userId}, 
                {$pull:{friends:req.params.friendId}}, 
                {new:true});
            if (!user){
                return res.status(404).json({message: 'Could not find user'});
            }
            res.json(user);
        }
        catch (err){
            res.status (500)({message: 'Could not remove friend'});
            console.log('Could not remove friend');
        }
    }
};

