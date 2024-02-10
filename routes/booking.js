const path = require('path');

const express = require('express');

const bookingController = require('../controllers/booking');

const router = express.Router();

router.get('/booking/get-user',bookingController.getUser)
router.post('/booking/add-user',bookingController.postUsers)
router.delete('/booking/delete-user/:id',bookingController.deleteUser)


module.exports = router;
