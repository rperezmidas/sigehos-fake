/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksAppointments');


/* GET home page. */
router.get('/', function(req, res, next) {
    var appointments = [];
    res.json(appointments);
});
router.get('/:appointmentId', function(req, res, next) {
    var appointments = [{id:1}];
    res.json(appointments[0]);
});
router.put('/:appointmentId', function(req, res, next) {
    var appointments = [{id:1}];
    res.json(appointments[0]);
});
router.post('/:appointmentId/confirm', function(req, res, next) {
    if (!req.body) {
        next({
            "error_description": "body can not be null",
            "error": "invalid_request"
        });
    }
    var confirm = mocks.confirmAppointment(req.params.appointmentId);
    if (!confirm) {
        return next({
            "error_description": "appointment could not be confirm",
            "error": "invalid_request"
        });

    }
    console.log(confirm);
    res.json(confirm);
    return false;
});

module.exports = router;
