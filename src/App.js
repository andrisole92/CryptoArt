// @flow
import React from "react";
import {Route, withRouter} from "react-router-dom";

import Home from './Pages/Home'
import SignIn from "./Pages/SignIn";
import MyCabinet from "./Pages/MyGallery/MyGallery";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin";
import Contract from 'truffle-contract'
import SaleClockAuctionContract from './contracts/SaleClockAuction.json'
import CryptoArtContract from './contracts/KittyCore.json'
import Web3 from 'web3';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";


import {setSale, setCore} from './modules/contract'
import {addAuction, setAuctionTotal, setTokenArray} from './modules/auction'
import {addArt, setTotal} from './modules/art'
import Loader from "./Components/Loader/Loader";
import GalleryOf from "./Pages/GalleryOf/GalleryOf";
import {setAddress} from "./modules/account";
import BuyArt from "./Pages/BuyArt/BuyArt";
import FAQ from "./Pages/FAQ/FAQ";
import NeedWeb3 from "./Pages/NeedWeb3/NeedWeb3";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            saleLoaded: false,
            coreLoaded: false,
            error: false,
            noWeb3: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount3');
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
            this.web3Ready();
        } else {
            this.setState({noWeb3: true});
            this.props.goTo('/dapp');
            // set the provider you want from Web3.providers
            // this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            // window.web3 = new Web3(this.web3Provider);
        }
        // this.props.goTo('/dapp');


    }

    web3Ready() {
        window.web3.eth.getAccounts().then((accs) => {
            if (accs.length > 0) {
                window.web3.eth.defaultAccount = accs[0];
                this.props.setAddress(accs[0]);
            }


        });
        setInterval(function () {
            window.web3.eth.getAccounts().then((accs) => {
                if (accs.length === 0) return;
                if (window.web3.eth.defaultAccount !== accs[0]) {
                    window.location.reload();
                }
            });
        }, 100);
        const CryptoArt = Contract(CryptoArtContract);
        const SaleAuction = Contract(SaleClockAuctionContract);
        CryptoArt.setProvider(window.web3.currentProvider);
        SaleAuction.setProvider(window.web3.currentProvider);

        CryptoArt.deployed().then((i) => {
            window.core = i;
            this.props.setCore(new window.web3.eth.Contract(CryptoArt.abi, i.address));
            this.setState({coreLoaded: true});
            i.totalSupply.call().then((r) => {
                console.log(r);
                this.props.setTotal(r.c[0]);
            });
            SaleAuction.deployed().then((s) => {
                window.sale = s;
                this.props.setSale(new window.web3.eth.Contract(SaleAuction.abi, s.address));
                this.setState({saleLoaded: true});
                i.tokensOfOwner(s.address).then((r) => {
                    let arr = [];
                    arr = r.map((t) => t.c[0]);
                    this.props.setTokenArray(arr);
                    this.props.setAuctionTotal(arr.length);
                    this.bothContractsReady()
                });

            });
        });
    }

    bothContractsReady() {
        for (let i = 1; i <= this.props.art.total; i++) {
            if (this.props.art.allArt.find((e) => e.tokenId === i) !== undefined || this.props.auction.byPage.find((e) => e.tokenId === i) !== undefined) continue;
            this.props.contract.core.methods.getKitty(i).call({from: window.web3.eth.defaultAccount}).then((r) => {
                r.tokenId = i;
                if (this.props.auction.tokens.indexOf(i) === -1) {
                    return this.props.contract.core.methods.ownerOf(i).call({from: window.web3.eth.defaultAccount}).then((p) => {
                        r.owner = p;
                        this.props.addArt(r);
                    });
                } else {
                    return this.props.contract.sale.methods.getAuction(i).call({from: window.web3.eth.defaultAccount}).then((p) => {
                        let unixTime = parseInt((new Date()).getTime() / 1000, 0);
                        let currentPrice;
                        if ((parseInt(p.duration, 0) + parseInt(p.startedAt, 0)) > Date.now()) {
                            currentPrice = p.endingPrice;
                        } else {
                            let totalPriceChange = (parseInt(p.endingPrice, 0) - parseInt(p.startingPrice, 0));
                            let currentPriceChange = totalPriceChange * ((unixTime - parseInt(p.startedAt, 0)) / p.duration);
                            currentPrice = parseInt(currentPriceChange, 0) + parseInt(p.startingPrice, 0);
                        }
                        r.currentPrice = currentPrice.toString();
                        r.seller = p.seller;
                        this.props.addAuction(r)
                    });
                }
            })
        }
    }


    render() {
        return (
            <div>
                <Header></Header>
                <Loader
                    loaded={(this.state.saleLoaded && this.state.coreLoaded && this.props.art.total !== null && this.props.auction.tokens !== null) || this.state.noWeb3}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/marketplace" component={Home}/>
                    <Route exact path="/sign-in" component={SignIn}/>
                    <Route exact path="/my-cabinet" component={MyCabinet}/>
                    <Route exact path="/my-gallery" component={MyCabinet}/>
                    <Route exact path="/owner/:address" component={GalleryOf}/>
                    <Route exact path="/admin" component={Admin}/>
                    <Route exact path="/faq" component={FAQ}/>
                    <Route exact path="/dapp" component={NeedWeb3}/>
                    <Route exact path="/buy/:tokenId" component={BuyArt}/>
                </Loader>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    contract: state.contract,
    art: state.art,
    auction: state.auction
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setSale,
    setCore,
    setTotal,
    setAuctionTotal,
    setTokenArray,
    setAddress,
    addAuction,
    addArt,
    goTo: (route) => push(route)
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
