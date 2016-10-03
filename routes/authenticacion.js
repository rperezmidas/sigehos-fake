'use strict';

var express = require('express');

var router = express.Router();
var lastRefresh = '';

router.post('/oauth2/access_token/', (req, resp, next) => {
    var invalid = {
        "error_description": "Invalid credentials given.",
        "error": "invalid_grant"
    };
    var error = null;

    if (!req.body.refresh_token) {
        if (!req.body.username) {
            var error = true;
            next({
                "error_description": "Request is missing username parameter.",
                "error": "invalid_request"
            });
        } else if (req.body.username !== 'prueba_webservices') {
            var error = true;
            next(invalid);
        } else if (!req.body.password) {
            var error = true;
            next({
                "error_description": "Request is missing password parameter.",
                "error": "invalid_request"
            });
        } else if (req.body.password !== '123456') {
            var error = true;
            next(invalid);
        } else if (!req.body.client_id) {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (req.body.client_id !== '2c947d53e5a857e1805f') {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (!req.body.client_secret) {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (req.body.client_secret !== '6b46cb5fe78a9d811e8b2b93b95d2562d3a4fc40') {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (!req.body.grant_type) {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        } else if (req.body.grant_type !== 'password') {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        }
    } else if (req.body.refresh_token) {
        if (!req.body.client_id) {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (req.body.client_id !== '2c947d53e5a857e1805f') {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (!req.body.client_secret) {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (req.body.client_secret !== '6b46cb5fe78a9d811e8b2b93b95d2562d3a4fc40') {
            var error = true;
            next({
                "error": "invalid_client"
            });
        } else if (!req.body.grant_type) {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        } else if (req.body.grant_type !== 'refresh_token') {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        }else if (!req.body.access_type) {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        } else if (req.body.access_type !== 'offline') {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        }else if (!req.body.refresh_token) {
            var error = true;
            next({
                "error_description": "Missing refresh token parameter.",
                "error": "invalid_request"
            });
        } else if (req.body.refresh_token !== lastRefresh) {
            var error = true;
            next({
                "error": "unsupported_grant_type"
            });
        }
    }
    if(!error){
        lastRefresh = Math.random().toString(36).substring(7);
        resp.json({
            "access_token": Math.random().toString(36).substring(7),
            "token_type": "Bearer",
            "expires_in": 36000,
            "refresh_token": lastRefresh,
            "scope": "read write"
        });
        resp.send();
    }
});


module.exports = router;



