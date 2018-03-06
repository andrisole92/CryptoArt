const KittyCore = artifacts.require("KittyCore");
const SaleClockAuction = artifacts.require("SaleClockAuction");
// const SafeMath = artifacts.require("SafeMath");

module.exports = function (deployer) {
    // deployer.deploy(SafeMath);
    deployer.deploy(KittyCore).then(function () {
        return deployer.deploy(SaleClockAuction, KittyCore.address, 2000);
    });
};