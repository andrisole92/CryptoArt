import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from './Pages/Home'
import SignIn from "./Pages/SignIn";
import MyCabinet from "./Pages/MyCabinet";
import Header from "./Components/Header";
import Admin from "./Pages/Admin";
import Contract from 'truffle-contract'
import SaleClockAuctionContract from './contracts/SaleClockAuction.json'
import CryptoArtContract from './contracts/KittyCore.json'

import store from './store'

import Web3 from 'web3';

class App extends React.Component {

    componentDidMount() {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            window.web3 = new Web3(this.web3Provider);
        }
        // this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        // window.web3 = new Web3(this.web3Provider);
        window.web3.eth.getAccounts().then((accs) => window.web3.eth.defaultAccount = accs[0]);
        const CryptoArt = Contract(CryptoArtContract);
        const SaleAuction = Contract(SaleClockAuctionContract);
        CryptoArt.setProvider(window.web3.currentProvider);
        SaleAuction.setProvider(window.web3.currentProvider);

        // console.log(CryptoArtContract.deployed());
        // console.log(CryptoArt.deployed());

        SaleAuction.deployed().then(i => {
            window.sale = i
            window.test = new window.web3.eth.Contract(window.sale.abi);

        });
        CryptoArt.deployed().then(i => {
            window.core = i

        });
        store.dispatch({type: 'contract/SET_CORE', contract: CryptoArt});
        store.dispatch({type: 'contract/SET_SALE', contract: SaleAuction});

        window.ccc =CryptoArt;

        CryptoArt.deployed().then(meta => {

            const allEvents = meta.allEvents({
                fromBlock: 0,
                toBlock: 'latest'
            });
            allEvents.watch((err, res) => {
                if (err) console.error(err);
                if (res) {
                    console.log(res);
                    if (res.event === "Birth") {
                        console.log("Birth");
                        store.dispatch({type: 'art/ADD', newArt: {name: res.args.name, id: res.args.kittyId.c[0]}})
                    }
                }
            });
        });
        SaleAuction.deployed().then(meta => {

            const allEvents = meta.allEvents({
                fromBlock: 0,
                toBlock: 'latest'
            });
            allEvents.watch((err, res) => {
                if (err) console.error(err);
                if (res) {
                    console.log(res);
                    if (res.event === "AuctionCreated") {
                        console.log("AuctionCreated");
                        store.dispatch({type: 'auction/CREATE', auction: res.args})
                    }
                }
            });
        });
    }


    render() {
        return (

            <Router>
                <div>
                    <Header></Header>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/sign-in" component={SignIn}/>
                    <Route exact path="/my-cabinet" component={MyCabinet}/>
                    <Route exact path="/admin" component={Admin}/>
                </div>
            </Router>

        );
    }
}


export default App;