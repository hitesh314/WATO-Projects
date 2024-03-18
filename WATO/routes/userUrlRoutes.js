const express = require('express');
const router = express.Router();
const userUrlRoutes = require('../controllers/UserUrlController');

//Sending request to shorten the url.
router.post('/generate',
    userUrlRoutes.generate);

//Get the shortened url.
router.post('/getDetailsUrl',
    userUrlRoutes.getShortUrl);

//Get user analytics of all the urls that are shortened.
router.post('/getUserUrls',
    userUrlRoutes.getUserUrls);

module.exports = router;