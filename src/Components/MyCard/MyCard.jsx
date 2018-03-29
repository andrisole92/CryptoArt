import React from "react";
import {push} from 'react-router-redux'
import {Button, Card, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import utils from 'web3-utils'
import bem from 'bem-cn';


import './MyCard.css'
import art from '../../art'

class CardArt extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            owner: "",
            sellPressed: false
        }

    }

    componentDidMount() {
        // this.props.core.methods.ownerOf(this.props.tokenId).call({from: window.web3.eth.defaultAccount}).then((res)=>{
        //     return this.setState((p) => {return {owner: res}});
        // });

    }

    onSell(o) {
        this.props.core.methods.createSaleAuction(parseInt(this.props.tokenId),utils.toWei(o.startPrice),utils.toWei(o.endPrice),parseInt(o.days * 3600)).send({from: window.web3.eth.defaultAccount}).then((r)=>{
            console.log(r)
        }).catch((e)=> console.log(e))
    }

    onOpenForm(){
        this.setState({sellPressed: true});
    }

    onCancelAuction(){
        this.props.sale.methods.cancelAuction(parseInt(this.props.tokenId)).send({from: window.web3.eth.defaultAccount}).then((r)=>{
            console.log(r)
        }).catch((e)=> console.log(e))
    }

    render() {
        const block = bem('MyCard');

        let img = art.find((e) => e.name === this.props.name);
        if (img){
            img = "/img/"+img.img;
        } else {
            img = "";
        }
        return (
                <Card centered className={block()}>
                    <div className="imgContainer">
                        <Image className="testImage" src={img}/>
                    </div>
                    <Card.Content>
                        <Card.Header>
                            {this.props.name}
                        </Card.Header>
                        <Card.Meta>
                            {this.props.artist}
                        </Card.Meta>
                        <Card.Meta>
                            Current price: {utils.fromWei(this.props.price)} Eth
                        </Card.Meta>
                    </Card.Content>
                </Card>

        );
    }
}

const mapStateToProps = state => ({
    art: state.art,
    account: state.account,
    auction: state.auction,
    core: state.contract.core,
    sale: state.contract.sale
});

const mapDispatchToProps = dispatch => bindActionCreators({
    galleryOf: (addr) => push('/owner/' + addr),

}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardArt)
