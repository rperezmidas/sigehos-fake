/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();

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
    
    var appointments = [{id:1}];
    res.json(appointments[0]);
});

module.exports = router;
