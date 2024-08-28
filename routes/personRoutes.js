const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Define routes for people directory
router.get('/personDetails', personController.getAllPeople);
router.get('/personDetails/:id', personController.getPersonById);
router.post('/personDetails', personController.createPerson);
router.put('/personDetails/:id', personController.updatePerson);
router.delete('/personDetails/:id', personController.deletePerson);
router.get('/search', personController.searchPeople);
router.get('/personDetails/filterByRole', personController.getPeopleByRole);


module.exports = router;
