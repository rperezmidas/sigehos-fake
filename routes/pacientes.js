/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksPacientes');
var lista = mocks.listaPacientes;

/* GET home page. */
router.get('/', function (req, res, next) {
    //get all patients
    if (req.query.page) {
        res.json(lista);
        res.send();
    }
    //Get by dni
    else if (req.query.nro_documento) {
        var listPacients = {count:0, results:[]};
        var index = 0;
        for (index; index < lista.results.length; index++) {
            if (lista.results[index].nro_documento === req.query.nro_documento) {
                listPacients.results.push(lista.results[index]);
                listPacients.count++;
            }
        }
        res.json(listPacients);
    }//return list
    else {
        res.json(lista);
    }
});

router.get('/:patientId', function (req, res, next) {


    var val = null;
    for (var i = 0; i < lista.results.length; i++) {

        if (parseInt(req.params.patientId) === lista.results[i].id) {

            val = lista.results[i];
            break;
        }
    }
    if (val) {

        res.json(val);
    } else {
        res.json({});
    }


});

router.get('/:patientId/appointments', function (req, res, next) {
    var appointments = [];
    var result = [];
    for(var i = 0; i < result.length; i++){
        if(result[i].speciality === req.query.medicalSpeciality) {
            appointments.push(result[i]);
        }
    }
    res.json(appointments);

});

module.exports = router;
