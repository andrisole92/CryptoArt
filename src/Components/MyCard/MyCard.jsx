import React from "react";
import {push} from 'react-router-redux'
import {Button, Card, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import utils from 'web3-utils'
import bem from 'bem-cn';


import './MyCard.css'
import art from '../../art'
import SellerForm from "../SellerForm/SellerForm";

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

    render() {
        const block = bem('MyCard');

        let img = "/img/"+art.find((e) => e.name === this.props.name).img;

        return (
                <Card centered className={block()}>
                    <div className="imgContainer">
                        <Image className="testImage" src={img}/>
                    </div>
                    <SellerForm className={block('sellContainer')()} isActive={this.state.sellPressed} onSell={(o)=>this.onSell(o)} onCancel={()=>this.setState({sellPressed:false})}/>
                    <Card.Content>
                        <Card.Header>
                            {this.props.name}
                        </Card.Header>
                        <Card.Meta>
                            {this.props.artist}
                        </Card.Meta>
                        <Card.Meta>
                            Current price: {utils.fromWei(this.props.price) * 2} Eth
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Button onClick={() => this.onOpenForm()} basic fluid color='teal'>Create Auction</Button>
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
