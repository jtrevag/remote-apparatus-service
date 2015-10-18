var express = require('express');
var router = express.Router();
var sys = require('sys');
var exec = require('child_process').exec;

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
            updateLightCollection(collection, roomName, "on");
            res.json({ message: 'Light turned on for room: ' + docs[0]["room"] + '!', status: 'on' });
        });
    }
    else if(state === 'off'){
         collection.find({ room: roomName },{},function(e,docs){
            sendLightCode(docs[0]["off_code"]);
            updateLightCollection(collection, roomName, "off");
            res.json({ message: 'Light turned off for room: ' + docs[0]["room"] + '!', status: 'off' });
        });
    }
    else{
        res.json({ message: 'Invalid state sent: ' + state });
    }
});    

module.exports = router;

var puts = function (error, stdout, stderr) { console.log(stdout); };

var executeCommand = function (lightCode, pulse){
    var interval = setInterval(function(){
        if(pulse > 185){
            clearInterval(interval);
        }
        var command = "/var/www/rfoutlet/codesend " + lightCode + " " + pulse;
        exec(command, puts);
        console.log(command)
        pulse++;
    }, 500)
}

var sendLightCode = function (lightCode){
    executeCommand(lightCode, 183);
}

var updateLightCollection = function(collection, roomName, statusCode){
    collection.update({room : roomName}, {$set: {status: statusCode}});
}

