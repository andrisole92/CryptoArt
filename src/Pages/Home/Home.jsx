import React, {Component} from 'react';

import {Card} from 'semantic-ui-react';
import {connect} from 'react-redux'
import './Home.css';
import CardArt from "../../Components/CardArt";
import {addArt} from "../../modules/art";
import {bindActionCreators} from "redux";
import {addAuction} from "../../modules/auction";

import utils from 'web3-utils'
import SaleCard from "../../Components/SaleCard/SaleCard";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        }
    }

    componentDidMount() {
        window.contract = this.props.contract;
        for (let j = 0; j < this.props.auction.tokens.length; j++) {

        }
        for (let i = 1; i <= this.props.art.total; i++) {
            this.props.contract.core.methods.getKitty(i).call({from: window.web3.eth.defaultAccount}).then((r) => {
                r.tokenId = i;
                if (this.props.auction.tokens.indexOf(i) === -1) {
                    return this.props.contract.core.methods.ownerOf(i).call({from: window.web3.eth.defaultAccount}).then((p) => {
                        r.owner = p;
                        this.props.addArt(r);
                    });

                } else {
                    return this.props.contract.sale.methods.getCurrentPrice(i).call({from: window.web3.eth.defaultAccount}).then((p) => {
                        r.currentPrice = p;
                        this.props.addAuction(r)
                    });
                }
            })
        }
    }


    render() {
        let auctionCards = this.props.auction.byPage.map((a) => <SaleCard key={a.tokenId} name={a.name}
                                                                         price={a.currentPrice}
                                                                         tokenId={a.tokenId}
                                                                         img="./img/lisa.jpg" artist="Leo"/>);
        let cards = this.props.art.allArt.map((a) => <CardArt key={a.tokenId} price={a.lastPrice} tokenId={a.tokenId} name={a.name} owner={a.owner} img="./img/lisa.jpg"
                                                              artist="Leo"/>);

        return (
            <div className="home">
                <p>Auction</p>
                <Card.Group className="ui container center aligned" itemsPerRow={4} stackable={true} doubling={true}>
                    {auctionCards}
                </Card.Group>
                <p>All</p>
                <Card.Group className="ui container center aligned" itemsPerRow={4} stackable={true} doubling={true}>
                    {cards}
                </Card.Group>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    art: state.art,
    auction: state.auction,
    contract: state.contract
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addArt,
    addAuction
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
