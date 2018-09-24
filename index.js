var nodeMuse = require("node-muse");

var Muse = nodeMuse.connect().Muse;

Muse.on('connected', function(){
    // There's definitely a muse connected right now!
});

Muse.on('uncertain', function(){
    // For some reason, i'm not detecting the muse anymore at the moment...
    // Waiting for new signals to arrive...
})

Muse.on('disconnected', function(){
    // Nope, it's definitely not connected anymore...
});
