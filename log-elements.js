var osc = require("osc");

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 5000,
    metadata: true
});

udpPort.open();

udpPort.on("ready", function () {
  udpPort.on("message", function (oscMsg) {

    var address = oscMsg.address;
    if(address.includes("/muse/elements")){
      console.log("Data: ", oscMsg);
    }
  });
});
