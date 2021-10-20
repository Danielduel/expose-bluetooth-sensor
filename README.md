This repository is in early prototype state so problems are expected, if you have problem
with running this software - please submit github issue or contact me directly on
discord if you have direct connection with me.

### Installation
You will need node, yarn and some bluetooth-related dependencies.
  - https://nodejs.org/en
  get node, and yarn if for some reason you will get version of node without it
  - https://github.com/abandonware/noble
  scroll down to instructions for your OS

Install package using `yarn` and then run via `yarn start`.

### What this project tries to solve?
This project tries to remove the gap between broadcasting software and sensor that you own.
The aim is to get this data directly from the sensor, not from cloud wrappers or closedsource
apps on your smartphone.

### Scope of project
  - (Prototyping) Get data from bluetooth sensors (mainly heartrate sensors)
  - (Not ready) Expose data on websocket server
  - (Not ready) Provide examples (Browser source files for OBS/Streamlabs OBS)
  - (Not ready) Support for Linux, Windows and Mac

### Expected changes
  - Project will move to typescript if node version that bluetooth wrapper works on isn't too old.

### Changelog
(see tags)

- 0.0.1:
  - 20 October 2021
    - Get Heartrate reading from Polar H10
