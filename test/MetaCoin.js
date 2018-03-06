var KittyCore = artifacts.require("KittyCore");
var SaleAuction = artifacts.require("SaleClockAuction");

contract('KittyCore', function (accounts) {
    it("Should set CEO address", function () {
        var saleBalance = web3.eth.getBalance(KittyCore.address).toNumber();
        var coreBalance = web3.eth.getBalance(SaleAuction.address).toNumber();
        console.log('sale balance: ' + saleBalance + ", core balance: " + coreBalance);
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
            console.log(SaleAuction.address);
            console.log("We were expecting a Solidity throw (aka an invalid JUMP), we got one. Test succeeded.");
        });
    });

    describe('After SaleAuction is set', function () {
        beforeEach(function () {
            console.log('before every test in every file');
            return KittyCore.deployed().then(function (i) {
                i.setSaleAuctionAddress(SaleAuction.address);
            })
        });
        it("Should be able to unpause", function () {
            return KittyCore.deployed().then(function (i) {
                return i.unpause();
            }).then(function (a) {
                assert.equal(a.receipt.status, 1, "10000 wasn't in the first account");
            });
        });
    });
    describe('After unpaused', function () {
        var core;
        var sale;
        beforeEach(function () {
            console.log('before every test in every file');
            KittyCore.deployed().then(function (i) {
                core = i;
            });
            SaleAuction.deployed().then(function (i) {
                sale = i;
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
            var saleBalance = web3.eth.getBalance(KittyCore.address).toNumber();
            var coreBalance = web3.eth.getBalance(SaleAuction.address).toNumber();
            console.log('sale balance: ' + saleBalance + ", core balance: " + coreBalance);
            return KittyCore.deployed().then(function (i) {
                return i.createGen0Auction("mohnatik", "Andre Ruz",  100)
            }).then(function (res) {
                return core.totalSupply().then(function (n) {
                    assert.equal(n, 1, "Create Promo Art");
                });
            });
        });
        it("Promo Art Belongs To Auction", function () {
            return KittyCore.deployed().then(function (i) {
                return i.kittyIndexToOwner.call(1);
            }).then(function (res) {
                assert.equal(res, SaleAuction.address, "Create Promo Art");
            });
        });
        it("I can't Buy Art if bid is less then price*2", function () {
            return sale.bid(1, {value: 10}).then(function (a) {
                console.log(a);
            }).catch(function (error) {
                console.log('That is good that I can buy it for smaller than price*2')
            });
        });
        it("I can Buy Art if bid is more than price*2", function () {
            var saleBalance = web3.eth.getBalance(KittyCore.address).toNumber();
            var coreBalance = web3.eth.getBalance(SaleAuction.address).toNumber();
            console.log('sale balance: ' + saleBalance + ", core balance: " + coreBalance);
            return sale.bid(1, {value: 200}).then(function (a) {
                console.log(web3.eth.getBalance(accounts[0]).toNumber());
                console.log(web3.eth.getBalance(sale.address));
                assert.equal(a.receipt.status, 1, "Bid Successful");
            })
        });
        it("Promo Art belongs to me when I buy it", function () {
            return core.kittyIndexToOwner.call(1).then(function (res) {
                assert.equal(res, accounts[0], "Cat belongs to me after buy");
            })
        });
        it("I can withdraw from Sale Auction", function () {
            var saleBalance = web3.eth.getBalance(sale.address).toNumber();
            var coreBalance = web3.eth.getBalance(core.address).toNumber();
            console.log('sale balance: ' + saleBalance + ", core balance: " + coreBalance);
            return core.withdrawAuctionBalances().then(function (res) {
                assert.equal(saleBalance + coreBalance, web3.eth.getBalance(core.address).toNumber(), "I can withdraw from Sale Auction");
            })
        });
        it("I can see last Kitty Price", function () {

            core.getKitty(1).then(function (res) {
                console.log(res);
            });
            // sale.kittyAuction.call().then(function(res){
            //     console.log(res);
            // })
            // sale.nonFungibleContract.call().then(function(res){
            //     console.log(res);
            // })
        });
        it("I can't buy my own cat", function () {

            core.bid.call(1, {value: 5000}).then(function (res) {
                console.log(res);
            }).catch(function (error) {
                console.log('I am expected to throw')
            })
        });
        it("I can buy any cat", function () {
            core.bid(1, {from: accounts[3], value: 5000}).then(function (res) {
                return core.ownerOf(1).then(function (res) {
                    console.log(res);
                });
            })
        });
        // it("The cat that I bought belongs to me", function() {
        //     core.ownerOf.call(1).then(function(res){
        //         console.log(res);
        //         console.log(accounts);
        //     })
        // });
    });
});