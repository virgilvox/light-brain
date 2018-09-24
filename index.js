var nodeMuse = require("node-muse");

var Muse = nodeMuse.connect().Muse;

Muse.on('connected', function(){
    // There's definitely a muse connected right now!
    console.log("CONNECTED TO THE BRAIN MACHINE")
});

Muse.on('uncertain', function(){
    // For some reason, i'm not detecting the muse anymore at the moment...
    // Waiting for new signals to arrive...
    console.log("stuff went bad, dunno what")
})

Muse.on('disconnected', function(){
    // Nope, it's definitely not connected anymore...
    console.log("Disconnected!");
});

Muse.on('/muse/eeg', function(data){
    // Receiving EEG signals!
    console.log("Data: ", data);
});
