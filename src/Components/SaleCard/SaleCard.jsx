import React from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from 'react-router-redux'

import utils from 'web3-utils'
import bem from 'bem-cn';
import art from '../../art';
import './Card.css'


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

        const block = bem('SaleCard');

        let img = "/img/"+art.find((e) => e.name === this.props.name).img;
        return (
            <Card className={block()} centered>
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
                    <Card.Description className={block('seller')()}>
                        <p>
                            Sold by <strong
                            onClick={() => this.props.galleryOf(this.props.seller)}>{this.props.seller}</strong>
                        </p>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    galleryOf: (addr) => push('/owner/' + addr)
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaleCard)
