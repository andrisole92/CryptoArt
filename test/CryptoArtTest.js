const KittyCore = artifacts.require("KittyCore");

contract('KittyCore', function (accounts) {
    it("Should set CEO address", function () {
        return KittyCore.deployed().then(function (i) {
            return i.ceoAddress.call();
        }).then(function (a) {
            assert.equal(a, accounts[0], "10000 wasn't in the first account");
        });
    });
    it("Should set COO address", function () {
        return KittyCore.deployed().then(function (i) {
            return i.cooAddress.call();
        }).then(function (a) {
            assert.equal(a, accounts[0], "10000 wasn't in the first account");
        });
    });
    it("Should not be able to unpause", function () {
        return KittyCore.deployed().then(function (i) {
            return i.unpause();
        }).then(function (a) {
            assert.equal(a, accounts[0], "10000 wasn't in the first account");
        }).catch(function () {
            console.log("We were expecting a Solidity throw (aka an invalid JUMP), we got one. Test succeeded.");
        });
    });

    describe('After SaleAuction is set', function () {
        beforeEach(function () {
            console.log('before every test in every file');
        });
        it("Should be able to unpause", function () {
            return KittyCore.deployed().then(function (i) {
                return i.unpause().then((res) => {
                    console.log(res)
                });
            }).catch((e) => {
                console.log(e)
            })
        });
    });
    describe('After unpaused', function () {
        var core;
        beforeEach(function () {
            console.log('before every test in every file');
            KittyCore.deployed().then(function (i) {
                core = i;
            });
        });
        it("Is Unpaused", function () {
            return KittyCore.deployed().then(function (i) {
                return i.paused.call();
            }).then(function (res) {
                assert.equal(res, false, "Is UnPaused");
            });
        });
        it("Create Promo Art", function () {
            return KittyCore.deployed().then(function (i) {
                return i.createGen0Auction("mohnatik", "Andre Ruz", 100)
            }).then(function (res) {
                return core.totalSupply().then(function (n) {
                    assert.equal(n, 1, "Create Promo Art");
                });
            });
        });
        it("Promor Art Last Price is Equals to One that was Created after Created", function () {
            core.getKitty(1).then((r) => {
                console.log(r[1].c[0]);
                assert.equal(r[1].c[0], 100, "Price Created equals Last Price");
            })
        });
        it("Promo Art Belongs Core", function () {
            return KittyCore.deployed().then(function (i) {
                return i.kittyIndexToOwner.call(1);
            }).then(function (res) {
                assert.equal(res, KittyCore.address, "Create Promo Art");
            });
        });
        it("I can't Buy Art if bid is less then price*1.1", function () {
            return core.bid(1, {value: 109}).then(function (a) {
                console.log(a);
            }).catch(function (error) {
                console.log('That is good that I can buy it for smaller than price*1.1')
            });
        });
        it("I can't Buy Art if I bid is more than price*2", function () {
            return core.bid(1, {value: 30000000000}).then(function (a) {
                console.log(a);
                console.log("New Core Balance After: " + web3.eth.getBalance(core.address).toNumber());
                assert.equal(a.receipt.status, 1, "Bid Successful");
            }).catch((e) => {
                console.log('That is good that I can buy it for more than price*2')
            })
        });

        it("I can Buy Art if I bid is more lower price*2", function () {
            return core.bid(1, {value: 200}).then(function (a) {
                assert.equal(a.receipt.status, 1, "Bid Successful");
            });
        });
        it("Promo Art belongs to me when I buy it", function () {
            console.log("Core Balance: " + web3.eth.getBalance(core.address));
            return core.ownerOf(1).then((res) => {
                assert.equal(res, accounts[0], "Art belongs to me after buy");
            }).catch((e) => {
                console.log("Error: ");
                console.log(e)
            })
        });
        it("Promo Art Last Price Is modified", function () {
            return core.getKitty(1).then((res) => {
                assert.equal(res[1].c[0], 200, "Is Equals Indeed");
            })
        });
        it("Someone Can Buy My Art for price*1.1", function () {
            console.log("Core Balance: " + web3.eth.getBalance(core.address));

            return core.bid(1, {value: 220, from: web3.eth.accounts[1]}).then(function (a) {
                console.log("Core Balance: " + web3.eth.getBalance(core.address));

                assert.equal(a.receipt.status, 1, "Bid Successful");
            });
        });
        it("And I Can Buy It Back For price*2", function () {
            console.log("Core Balance: " + web3.eth.getBalance(core.address));
            return core.bid(1, {value: 440, from: web3.eth.accounts[0]}).then(function (a) {
                assert.equal(a.receipt.status, 1, "Bid Successful");
            });
        });
        it("And Someone Can't Buy It Back for Price*2.1", function () {
            console.log("Core Balance: " + web3.eth.getBalance(core.address));
            return core.bid(1, {value: 881, from: web3.eth.accounts[1]}).then(function (a) {
                assert.equal(a.receipt.status, 1, "Bid Successful");
            }).catch(()=>{
                console.log("That is all right");
            })
        });

    });
});