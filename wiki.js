const express = require ("express");

const router = express.Router();

//Home page route 
router.get('/', function(req, res){
    res.send("Welcome home page")
});


//About the page route
router.get('/about', function(req, res){
    res.send(" About the library")
});

module.exports = router;