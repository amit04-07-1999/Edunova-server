const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'],
    required: true,
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
