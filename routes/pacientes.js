/**
 * Created by rodriusp on 03/10/16.
 */
var express = require('express');
var router = express.Router();
var mocks = require('../models/mocksPacientes');
var lista = mocks.listaPacientes;

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.page) {
        res.json(lista);
    } else if (req.query.nro_documento) {
        console.log(req.query.nro_documento);
        var listPacients = {};
        var index = 0;
        console.log(lista.results);
        for (index; index < lista.results; index++) {
            if (lista.results[index].nro_documento === Int.parse(req.query.nro_documento)) {
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

module.exports = router;
