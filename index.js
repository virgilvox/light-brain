var five = require("johnny-five");
var board = new five.Board();
var osc = require("osc");

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0", // 0.0.0.0 if able to plug in compu's IP to Mind Monitor app
    localPort: 5000,
    metadata: true
});

board.on("ready", function() {

  var led = new five.Led(13); // standard arduino built-in LED pin

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
