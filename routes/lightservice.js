var express = require('express');
var router = express.Router();
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout); };


router.route('/')
.put(function(req,res,next){
    var state = req.body.state;
    var roomName = req.body.room;
    var check = req.body.check;
    var db = req.db;
    var collection = db.get('light_collection');
    
    if(check === 'true'){
        collection.find({ room: roomName },{},function(e,docs){
            console.log(docs);
            console.log(docs[0]);
            console.log(docs[0]["room"]);
            res.json(docs);
        });
    }
    else if(state === 'on'){
         exec("/var/www/rfoutlet/codesend 4281795", puts);
         res.json({ message: 'Light turned on!' });
    }
    else if(state === 'off'){
         exec("/var/www/rfoutlet/codesend 4281804", puts);
         res.json({ message: 'Light turned off!' });
    }
    else{
        res.json({ message: 'Invalid state sent: ' + state });
    }
});    


/*
router.get('/computer_room/on', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4281795", puts);
    // Return JSON(?)
});
    

router.get('/computer_room/off', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4281804", puts);
    // Return JSON(?)
});
*/

router.get('/bedroom/on', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4282115", puts);
    // Return JSON(?)
});

router.get('/bedroom/off', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4282124", puts);
    // Return JSON(?)
});

router.get('/living_room/front/on', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4283651", puts);
    // Return JSON(?)
});

router.get('/living_room/front/off', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4283660", puts);
    // Return JSON(?)
});

router.get('/living_room/back/on', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4289795", puts);
    // Return JSON(?)
});

router.get('/living_room/back/off', function(req, res) {
    // Execute codesend
    exec("/var/www/rfoutlet/codesend 4289804", puts);
    // Return JSON(?)
});

module.exports = router;