/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksPacientes');
var lista = mocks.listaPacientes;

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.page) {
        res.json(lista);
        res.send();
    } else if (req.query.nro_documento) {
        var listPacients = {};
        var index = 0;
        for (index; index < lista.results.length; index++) {
            if (lista.results[index].nro_documento === req.query.nro_documento) {
                listPacients  = lista.results[index];
                break;
            }
        }
        res.json(listPacients);
    }
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

module.exports = router;
