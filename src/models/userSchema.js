var mongoose = require("mongoose");

// User Schema
var userSchema = new mongoose.Schema({
  UserName: { type: String, unique: true },
  Email: { type: String, unique: true },
  FirstName: String,
  LastName: String,
  Password: String,
});

var User = mongoose.model("User", userSchema);

// Kanban Task Schema
var taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'progress', 'completed'] },
});

var Task = mongoose.model("Task", taskSchema);

// Exporting models
module.exports =User;