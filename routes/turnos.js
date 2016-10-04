/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksAppointments');


/* GET home page. */
router.get('/', function(req, res, next) {

    var appointments = mocks.getAppointments;
    if (!appointments) {
        next({
            "error_description": "error sigehos.",
            "error": "error busqueda de turnos"
        });
    }
    res.json(appointments);
});

router.get('/:appointmentId', function(req, res, next) {

    var appointments = mocks.findById(parseInt(req.params.appointmentId));
    if (!appointments) {
        next({
            "error_description": "error sigehos communication.",
            "error": "error busqueda de turno"
        });
    }else{

    res.json(appointments);
    }
});

router.put('/:appointmentId', function(req, res, next) {
    var response = mocks.createAppointmentByApp(req.params.appointmentId, req.body.patientId);
    if (!response) {
        return next({
            "error_description": "error sigehos communication.",
            "error": "error creacion de turno"
        });

    }
    res.json(response);
    return false;
});

router.post('/:appointmentId/confirm', function(req, res, next) {
    if (!req.body) {
        next({
            "error_description": "body can not be null",
            "error": "invalid_request"
        });
    }
    var confirm = mocks.confirmAppointment(parseInt(req.params.appointmentId), parseInt(req.body.patient_id));
    if (!confirm) {
        return next({
            "error_description": "appointment could not be confirm",
            "error": "invalid_request"
        });
    }
    res.json(confirm);
    return false;
});

module.exports = router;
