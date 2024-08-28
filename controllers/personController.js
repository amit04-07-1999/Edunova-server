const Person = require('../models/personModel');

// Get all people
exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single person by ID
exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new person
exports.createPerson = async (req, res) => {
  const person = new Person({
    firstName: req.body.firstName,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing person
exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Person not found' });
    }

    if (req.body.firstName != null) {
      person.firstName = req.body.firstName;
    }
    if (req.body.email != null) {
      person.email = req.body.email;
    }
    if (req.body.role != null) {
      person.role = req.body.role;
    }

    const updatedPerson = await person.save();
    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a person
exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search for people by name, role, and email
exports.searchPeople = async (req, res) => {
  try {
    const { name, role, email } = req.query;

    const query = {};
    if (name) {
      query.firstName = { $regex: name, $options: 'i' };
    }
    // if (role) {
    //   query.role = { $regex: role, $options: 'i' };
    // }
    // if (email) {
    //   query.email = { $regex: email, $options: 'i' };
    // }

    const people = await Person.find(query);
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get people filtered by role
exports.getPeopleByRole = async (req, res) => {
  const role = req.query.role;

  try {
      // Check if role is provided
      if (!role) {
          return res.status(400).json({ message: 'Role query parameter is required' });
      }

      // Find people by role
      const people = await Person.find({ role: role });

      // Send response
      res.status(200).json(people);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};