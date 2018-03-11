import React from "react";
import './Card.css'
import {Button, Card, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import utils from 'web3-utils'

class SaleCard extends React.Component {

    onBuy() {
        console.log(this.props.tokenId);
        window.sale = this.props.sale;
        this.props.sale.methods.bid(this.props.tokenId).send({
            from: window.web3.eth.defaultAccount, value: this.props.price, gas: 400000,
            gasPrice: 5000000000
        }).then((r) => {
            console.log(r);
        })
    }

    render() {
        return (
            <Card centered>
                <div className="imgContainer">
                    <Image className="testImage" src={this.props.img}/>
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.props.name}
                    </Card.Header>
                    <Card.Meta>
                        {this.props.artist}
                    </Card.Meta>
                    <Card.Description>
                        Owned by <strong>Mr Andresen</strong>
                    </Card.Description>
                    <Card.Meta>
                        Current price: {utils.fromWei(this.props.price)} Eth
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => this.onBuy()} basic fluid color='green'>Buy</Button>
                </Card.Content>
            </Card>

        );
    }
}

const mapStateToProps = state => ({
    sale: state.contract.sale
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaleCard)
