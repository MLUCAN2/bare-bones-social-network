const mongoose= require('mongoose');
const {User,Thought}= require ('../models');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB')


// This will be our seed data
const seedUsers = [
    { username: 'jane_doe', email: 'jane_doe@example.com', thoughts: [], friends: [] },
    { username: 'jane_smith', email: 'jane_smith@example.com', thoughts: [], friends: [] },
    { username: 'alice_jones', email: 'alice_jones@example.com', thoughts: [], friends: [] },
    { username: 'bob_brown', email: 'bob_brown@example.com', thoughts: [], friends: [] },
    { username: 'charlie_clark', email: 'charlie_clark@example.com', thoughts: [], friends: [] },
    { username: 'david_davis', email: 'david_davis@example.com', thoughts: [], friends: [] },
    { username: 'emily_evans', email: 'emily_evans@example.com', thoughts: [], friends: [] },
    { username: 'frank_foster', email: 'frank_foster@example.com', thoughts: [], friends: [] },
    { username: 'grace_jones', email: 'grace_jones@example.com', thoughts: [], friends: [] },
    { username: 'henry_hill', email: 'henry_hill@example.com', thoughts: [], friends: [] }
  ];
  const seedThoughts = [
    { thoughtText: "Me Jane, you Tarzan", username: 'jane_doe' },
    { thoughtText: "I am also Jane", username: 'jane_smith' },
    { thoughtText: "My dogs name is Alice too", username: 'alice_jones' },
    { thoughtText: "Bob isn't short for Robert, I am just Bob", username: 'bob_brown' },
    { thoughtText: "Good morning Angels", username: 'charlie_clark' },
    { thoughtText: "My friends call me double d", username: 'david_davis' },
    { thoughtText: "Nothing new to report", username: 'emily_evans' },
    { thoughtText: "Heir to the Franks fortune", username: 'frank_foster' },
    { thoughtText: "Grace Jones...GRACE JONES", username: 'grace_Jones' },
    { thoughtText: "There's a haunting at my old family manor", username: 'henry_hill' }
  ]; 
  const seedReactions = [
    { reactionBody: 'Great thought!', username: 'jane_doe' },
    { reactionBody: 'I agree with you!', username: 'jane_smith' },
    { reactionBody: 'Nice idea!', username: 'alice_jones' },
    { reactionBody: 'Very interesting.', username: 'bob_brown' },
    { reactionBody: 'I like this!', username: 'charlie_clark' },
    { reactionBody: 'Well said.', username: 'david_davis' },
    { reactionBody: 'Amazing thought!', username: 'emily_evans' },
    { reactionBody: 'Couldn\'t agree more.', username: 'frank_foster' },
    { reactionBody: 'Brilliant!', username: 'grace_green' },
    { reactionBody: 'Excellent point.', username: 'henry_hill' }
  ];

// This is to seed and remove users and thoughts from our db
async function seedDB() {
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    const users = await User.insertMany(seedUsers);
    
    const thoughtPromises = seedThoughts.map(async (thought, index) => {
      const user = users[index];
      const newThought = await Thought.create({
        ...thought,
        userId: user._id
      });
      
      user.thoughts.push(newThought._id);
      await user.save();
      
      return newThought;
    });
  
    const thoughts = await Promise.all(thoughtPromises);
    
    const reactionPromises = seedReactions.map(async (reaction, index) => {
      const thought = thoughts[index];
      thought.reactions.push(reaction);
      await thought.save();
    });
  
    await Promise.all(reactionPromises);
  
    // This is to seed our friends
    const friendPromises = users.map(async (user, index) => {
      const friend1 = users[(index + 1) % users.length]._id;
      const friend2 = users[(index + 2) % users.length]._id;
      user.friends.push(friend1, friend2);
      await user.save();
    });
  
    await Promise.all(friendPromises);
  
    console.log('Database seeded!');
    mongoose.connection.close();
  }
  
  seedDB();