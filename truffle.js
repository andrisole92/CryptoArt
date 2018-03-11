// Allows us to use ES6 in our migrations and tests.
require('babel-register');
let HDWalletProvider = require("truffle-hdwallet-provider");


const infura_apikey = "HmpCbfdDTeq63ZGuDd6k";
const mnemonic = "link acid donor calm sense genius grow valve add tomato inform tongue";

module.exports = {
    // contracts_build_directory: "./output",
    // migrations_directory: "./output",
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        },
        ropsten: {
            provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
            network_id: 3,
            gas: 4500000

        }
    }
};
