const HCIBindings = require('@abandonware/noble/lib/hci-socket/bindings');
const Noble = require('@abandonware/noble/lib/noble');

const params = {
  deviceId: 1,
  userChannel: true
};

const noble = new Noble(new HCIBindings(params));

function wrapHeartRateCharacteristic (characteristic) {
  // characteristic.once('descriptorsDiscover', x => console.log(x));
  // characteristic.on('data', x => console.log(x));
  // characteristic.discoverDescriptors();
  // characteristic.subscribe();
  characteristic.on('notify', console.log);
  characteristic.on('data', data => {
    const parse = new Buffer(data);
    const packetName = parse.readInt8();
    if (packetName === 0x10) {
      // 0x10 is bpm reading
      const packetNameSubtraction = 0x10 * 255 // value * max value in this segment 
      const bpmReading = parse.readInt16BE() - packetNameSubtraction;
    }
  });
  characteristic.subscribe();
}

function wrapHeartRateService (service) {
  service.once('characteristicsDiscover', characteristics => {
    characteristics.forEach(characteristic => {
      switch (characteristic.name) {
        case "Heart Rate Measurement": wrapHeartRateCharacteristic(characteristic);
      }
    })
  });
  service.once('includedServicesDiscover', console.log);
  service.discoverIncludedServices(); // particular UUIDs
}

noble.on('stateChange', async (state) => { 
  if (state === 'poweredOn') {
    console.log(noble.address);
    await noble.startScanningAsync([], true);
  }
});

noble.on('discover', async (peripheral) => {
  const name = peripheral.advertisement.localName;
  if (peripheral.advertisement.localName.startsWith("Polar")) {
    console.log(`Found ${name}`);
    await noble.stopScanningAsync();

    peripheral.once("connect", data => console.log("connect", data))
    peripheral.once('servicesDiscover', services => {
      services.forEach(service => {
        switch (service.name) {
          case "Heart Rate": wrapHeartRateService(service);
        }
      });
    });

    // peripheral.updateRssi();
    console.log(`Connecting ${name}`);
    await peripheral.connectAsync();
    console.log(`Discovering services on ${name}`);
    await peripheral.discoverSomeServicesAndCharacteristicsAsync([]);


    // await peripheral.disconnectAsync();
  }
});

noble.on("warning", msg => console.log("warning", msg))
// noble.on("unsupported", () => console.log("Unsupported"))

// const bluetooth = require('node-bluetooth');

// // create bluetooth device instance
// const device = new bluetooth.DeviceINQ();

// device.listPairedDevices(console.log);
