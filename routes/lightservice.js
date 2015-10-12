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
    
    //TODO: test and see if this garbage works.
    if(state === 'on' && roomName != null){
        collection.find({ room: roomName },{},function(e,docs){
            exec("/var/www/rfoutlet/codesend " + docs[0]["on_code"], puts);
            res.json({ message: 'Light turned on for room: ' + docs[0]["room"] + '!' });
        });
    }
    else if(state === 'off'){
         collection.find({ room: roomName },{},function(e,docs){
            exec("/var/www/rfoutlet/codesend " + docs[0]["off_code"], puts);
            res.json({ message: 'Light turned off for room: ' + docs[0]["room"] + '!' });
        });
    }
    else{
        res.json({ message: 'Invalid state sent: ' + state });
    }
});    

module.exports = router;