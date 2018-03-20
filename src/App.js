// @flow
import React from "react";
import {Route, withRouter} from "react-router-dom";

import Home from './Pages/Home'
import SignIn from "./Pages/SignIn";
import MyCabinet from "./Pages/MyGallery/MyGallery";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin";
import Contract from 'truffle-contract'
import CryptoArtContract from './contracts/KittyCore.json'
import Web3 from 'web3';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";


import {setCore, setGasPrice, setTruffleCore} from './modules/contract'
import {addAuction, setAuctionTotal, setTokenArray} from './modules/auction'
import {addArt, setTotal} from './modules/art'
import Loader from "./Components/Loader/Loader";
import GalleryOf from "./Pages/GalleryOf/GalleryOf";
import {setAddress,setSignedIn,setFullname,setEmail} from "./modules/account";
import BuyArt from "./Pages/BuyArt/BuyArt";
import FAQ from "./Pages/FAQ/FAQ";
import NeedWeb3 from "./Pages/NeedWeb3/NeedWeb3";
import {setMessage} from "./modules/app";
import {Message} from "semantic-ui-react";
import bem from 'bem-cn';
import Cookies from 'cookies-js'
import './App.css'


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
                let accountCookie = Cookies.get('account');
                if (accountCookie){
                    //cookie is present
                    let account = JSON.parse(accountCookie);
                    console.log('account');
                    if (account.address === accs[0]){
                        this.props.setFullname(account.fullName);
                        this.props.setEmail(account.email);
                        this.props.setSignedIn(true);
                    }
                }

            }


        });
        window.web3.eth.getGasPrice().then((r) => {
            this.props.setGasPrice(r);
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
        CryptoArt.setProvider(window.web3.currentProvider);
        window.cc = CryptoArt;
        CryptoArt.deployed().then((i) => {
            window.core = i;
            this.props.setCore(new window.web3.eth.Contract(CryptoArt.abi, i.address));
            this.props.setTruffleCore(CryptoArt);
            this.setState({coreLoaded: true});
            i.totalSupply.call().then((r) => {
                console.log(r);
                this.props.setTotal(r.c[0]);
                this.loadArt();
            });
        });
    }

    loadArt() {
        for (let i = 1; i <= this.props.art.total; i++) {
            this.props.contract.core.methods.getKitty(i).call({from: window.web3.eth.defaultAccount}).then((r) => {
                r.tokenId = i;
                return this.props.contract.core.methods.ownerOf(i).call({from: window.web3.eth.defaultAccount}).then((p) => {
                    r.owner = p;
                    this.props.addArt(r);
                });
            })
        }
    }

    handleDismiss() {
        this.props.setMessage("", "", null);
    }


    render() {

        const block = bem("App");


        let message = this.props.app.message === "" ? null : <Message
            color={this.props.app.messageType}
            className={block('message')()}
            onDismiss={() => this.handleDismiss()}
            header={this.props.app.messageHeader}
            content={this.props.app.message}
        />;

        return (
            <div>
                <Header></Header>
                <Loader
                    loaded={(this.state.coreLoaded && this.props.art.total !== null) || this.state.noWeb3}>
                    {message}
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
    app: state.app
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setCore,
    setTruffleCore,
    setGasPrice,
    setTotal,
    setAuctionTotal,
    setTokenArray,
    setAddress,
    setEmail,
    setFullname,
    setSignedIn,
    addAuction,
    addArt,
    setMessage,
    goTo: (route) => push(route)
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
