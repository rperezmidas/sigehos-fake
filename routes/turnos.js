/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksAppointments');


/* GET home page. */
router.get('/', function (req, res, next) {


    if (req.query.speciality) {

        var confirm = mocks.unsusedBySpeciality(req.query.speciality);
        if (!confirm) {
            return next({
                "error_description": "no available appointments",
                "error": "invalid_request"
            });
        } else {
            console.log('Expontaneos');
            console.log(confirm);
            res.json(confirm);
            return false;
        }
    } else {

        var appointments = mocks.getAppointments;
        if (!appointments) {
            next({
                "error_description": "error sigehos.",
                "error": "error busqueda de turnos"
            });
        } else {
            res.json(appointments);
        }
    }
});

router.get('/:appointmentId', function (req, res, next) {

    try {
        var appointments = mocks.findById(parseInt(req.params.appointmentId));
        if (!appointments) {
            next({
                "error_description": "error sigehos communication.",
                "error": "error busqueda de turno"
            });
        } else {

            res.json(appointments);
        }
    } catch (errr) {
        next({
            "error_description": "bad id",
            "error": "error busqueda de turno"
        });
    }

});

router.put('/:appointmentId', function(req, res, next) {
    if (!req.body) {
        next({
            "error_description": "body can not be null",
            "error": "invalid_request"
        });
    }
    var response = mocks.createAppointmentByApp(parseInt(req.params.appointmentId), parseInt(req.body.patient_id));
    if (!response) {
        return next({
            "error_description": "error sigehos communication.",
            "error": "error creacion de turno"
        });

    } else {
        res.json(response);
        return false;
    }
});

router.post('/:appointmentId/confirm', function (req, res, next) {
    if (!req.body) {
        next({
            "error_description": "body can not be null",
            "error": "invalid_request"
        });
    } else {
        var confirm = mocks.confirmAppointment(parseInt(req.params.appointmentId));
        if (!confirm) {
            return next({
                "error_description": "appointment could not be confirm",
                "error": "invalid_request"
            });
        } else {
            res.json(confirm);
            return false;
        }
    }
});


module.exports = router;
