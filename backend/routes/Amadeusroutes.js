// API Routes
const express = require("express");
const router = express.Router();
const flightController = require("../controller/Amadeuscontroller");

router.post("/search", flightController.getFlightOffers); //Flight Search API
router.post("/filter", flightController.filterFlight); //Flight Filter API

module.exports = router;
