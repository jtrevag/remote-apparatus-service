var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello World!!' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.post('/adduser', function(req,res) {
    // Set our internal DB variable
    var db = req.db;
    
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    
    // Set our collection
    var collection = db.get('usercollection');
    
    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email"    : userEmail,
    }, function(err, doc){
        if(err) {
            // If it failed, return error
            res.send("There was a problema dding the information to the database.");
        }
        else {
            res.redirect("userlist");
        }
    });
});

module.exports = router;
