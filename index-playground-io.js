var Playground = require("playground-io");
var five = require("johnny-five");
var board = new five.Board({
  io: new Playground({
    port: "/dev/tty.usbmodem1411",
    reportVersionTimeout: 200
  })
});
var osc = require("osc");

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 5000,
    metadata: true
});

board.on("ready", function() {

  var led = new five.Led(4);

  udpPort.open();

  udpPort.on("ready", function () {
    udpPort.on("message", function (oscMsg) {

      var address = oscMsg.address;
      if(address.includes("/muse/elements/beta_absolute")){
        var value = oscMsg.args[0].value;
        console.log(value);
        if(value > 0.29){
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
