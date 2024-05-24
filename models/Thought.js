// Create the schema for the thoughts
// This needs to include the actual thoughts, date created, references to the user, and reactions (replies) 

const {Schema, model}= require('mongoose');
const userSchema= require('./User');