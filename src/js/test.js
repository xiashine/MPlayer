
const defaultApiBackend = require("api");
const Ads = require("ads");


const options = {
    container: options.element || document.getElementsByClassName('dplayer')[0],
    apiBackend: defaultApiBackend
};
const ads = new Ads(options);