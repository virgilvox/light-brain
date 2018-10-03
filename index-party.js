var five = require("johnny-five");
var Particle = require("particle-io");  // see https://github.com/rwaldron/particle-io
var board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID
  })
});
var osc = require("osc");

// set up to receive streaming OSC data from Muse Monitor app on phone
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",  // will automatically look locally
    localPort: 5000,          // should match streaming port set in Muse Monitor
    metadata: true
});

board.on("ready", function() {
  console.log("Device Ready..");

  var led = new five.Led("D7");  // Photon's built-in LED on pin D7

  udpPort.open();

  udpPort.on("ready", function () {
    udpPort.on("message", function (oscMsg) {

      var address = oscMsg.address;
      if(address.includes("/muse/elements/beta_absolute")){
        var value = oscMsg.args[0].value;
        console.log(value);
        if(value > 0.4){
          console.log("on");
          led.on();
        }else {
          console.log("off");
          led.off();
        }
      }
    });
  });
});