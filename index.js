const { MUSE_SERVICE, MuseClient, zipSamples, channelNames } = require('muse-js');
const noble = require('noble');
const bluetooth = require('bleat').webbluetooth;

async function connect() {
    let device = await bluetooth.requestDevice({
        filters: [{ services: [MUSE_SERVICE] }]
    });
    const gatt = await device.gatt.connect();
    const client = new MuseClient();
    await client.connect(gatt);
    await client.start();
    // Now do whatever with muse client...
    client.eegReadings.subscribe(reading => {
    console.log(reading);
    });
    client.telemetryData.subscribe(telemetry => {
      console.log(telemetry);
    });
    client.accelerometerData.subscribe(acceleration => {
      console.log(acceleration);
    });
}

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        connect();
    }
});
