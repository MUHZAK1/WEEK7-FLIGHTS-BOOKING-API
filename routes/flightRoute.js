const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)

router.get('/add-flight', controller.addflight)

router.get('/get-all-flight', controller.getAllFlights)

router.get('/get-flight', controller.getSingleFlight)

router.get('/delete-flight', controller.deleteFlight)

module.exports = router;

