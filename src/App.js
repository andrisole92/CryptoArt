import React from "react";
import {Route} from "react-router-dom";

import Home from './Pages/Home'
import SignIn from "./Pages/SignIn";
import MyCabinet from "./Pages/MyCabinet/MyCabinet";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin";
import Contract from 'truffle-contract'
import SaleClockAuctionContract from './contracts/SaleClockAuction.json'
import CryptoArtContract from './contracts/KittyCore.json'
import Web3 from 'web3';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


import {setSale, setCore} from './modules/contract'
import {setAuctionTotal, setTokenArray} from './modules/auction'
import {setTotal} from './modules/art'
import Loader from "./Components/Loader/Loader";

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            saleLoaded: false,
            coreLoaded: false,
            error: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount3')
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            window.web3 = new Web3(this.web3Provider);
        }
        window.web3.eth.getAccounts().then((accs) => window.web3.eth.defaultAccount = accs[0]);
        const CryptoArt = Contract(CryptoArtContract);
        const SaleAuction = Contract(SaleClockAuctionContract);
        CryptoArt.setProvider(window.web3.currentProvider);
        SaleAuction.setProvider(window.web3.currentProvider);

        window.ccc = CryptoArt;
        CryptoArt.deployed().then((i) => {
            this.props.setCore(new window.web3.eth.Contract(CryptoArt.abi, i.address));
            this.setState({coreLoaded:true});
            i.totalSupply.call().then((r)=>{
                console.log(r);
                this.props.setTotal(r.c[0]);
            });
            SaleAuction.deployed().then((s) => {
                window.sale = s;
                this.props.setSale(new window.web3.eth.Contract(SaleAuction.abi, s.address));
                this.setState({saleLoaded:true});
                i.balanceOf(s.address).then((r2)=>{
                    this.props.setAuctionTotal(r2.c[0]);
                });
                i.tokensOfOwner(s.address).then((r)=>{
                    let arr = [];
                    arr = r.map((t) => t.c[0]);
                    this.props.setTokenArray(arr);
                })

                this.bothContractsReady()
            });
        });

    }

    bothContractsReady(){

    }


    render() {
        return (
            <div>
                <Header></Header>
                <Loader loaded={this.state.saleLoaded && this.state.coreLoaded && this.props.art.total !== null && this.props.auction.tokens !== null}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/sign-in" component={SignIn}/>
                    <Route exact path="/my-cabinet" component={MyCabinet}/>
                    <Route exact path="/admin" component={Admin}/>
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
    setTokenArray
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
