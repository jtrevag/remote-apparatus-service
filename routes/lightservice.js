var express = require('express');
var router = express.Router();
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout); };

function sendLightCode(lightCode){
    var command = "";
    for(var x = 183; x <= 186; x++){
        command.concat("/var/www/rfoutlet/codesend " + lightCode + " " + x + ";");
        console.log(command);
    }
    exec(command, puts);
}

router.route('/')
.put(function(req,res,next){
    var state = req.body.state;
    var roomName = req.body.room;
    var db = req.db;
    var collection = db.get('light_collection');
    
    //TODO: test and see if this garbage works.
    if(state === 'on' && roomName != null){
        collection.find({ room: roomName },{},function(e,docs){
            sendLightCode(docs[0]["on_code"]);
            //exec("/var/www/rfoutlet/codesend " + docs[0]["on_code"] + " 185;", puts);   
            res.json({ message: 'Light turned on for room: ' + docs[0]["room"] + '!' });
        });
    }
    else if(state === 'off'){
         collection.find({ room: roomName },{},function(e,docs){
            sendLightCode(docs[0]["off_code"]);
            res.json({ message: 'Light turned off for room: ' + docs[0]["room"] + '!' });
        });
    }
    else{
        res.json({ message: 'Invalid state sent: ' + state });
    }
});    

module.exports = router;