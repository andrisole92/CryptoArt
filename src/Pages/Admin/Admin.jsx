import React from "react";
import {Button, Form, Header, Grid} from "semantic-ui-react";

import './Admin.css'
import {connect} from "react-redux";

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            author: "",
            price: "",
            paused: null,
            coreBalance: 0,
            saleBalance: 0,
            totalSupply: 0
        }
    }

    componentDidMount() {

    }

    checkContractsReady() {
        console.log("checkContractsReady");
        if (window.core !== 'undefined' && window.core !== undefined && window.sale !== undefined && window.sale !== 'undefined') {
            let core = window.core;
            let sale = window.sale;
            let web3 = window.web3;
            this.getPaused();
            this.getTotalSupply();
            this.getTotalSupply();
            web3.eth.getBalance(core.address).then((res) => this.setState({coreBalance: res}));
            web3.eth.getBalance(sale.address).then((res) => this.setState({saleBalance: res}));
        } else {
            setTimeout(() => this.checkContractsReady(), 1000);
        }
    }

    onSubmit() {
        this.createPainting();
    }

    createPainting() {
        console.log('createPainting');
        let web3 = window.web3;
        console.log(this.props);
        this.props.contract.core.methods.createGen0Auction(this.state.name, this.state.author, parseInt(web3.utils.toWei(this.state.price, "ether"), 10)).send({
            from: web3.eth.defaultAccount,
            gas: 400000,
            gasPrice: 5000000000
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    onPause() {
        let core = window.core;
        let web3 = window.web3;
        if (this.state.paused === false) {
            core.pause({from: web3.eth.defaultAccount}).then((r) => {
                this.getPaused();
            })
        } else if (this.state.paused) {
            core.unpause({from: web3.eth.defaultAccount}).then((r) => {
                this.getPaused();
            })
        }
    }

    getPaused() {
        let core = window.core;
        core.paused.call().then((r) => {
            this.setState({paused: r})
        });
    }

    getTotalSupply() {
        let core = window.core;
        core.totalSupply.call().then((r) => {
            console.log(r.c);
            this.setState({totalSupply: r.c})
        });
    }

    render() {
        return (
            <div className="admin ui container aligned">
                <Header >
                    <Header.Content>

                        <p>Total on Sale: {this.props.sale.total}</p>
                        <p>Total Supply: {this.props.art.total}</p>
                        {/*<Grid.Row>*/}
                            {/*<Button onClick={() => this.onPause()}>{this.state.paused ? "Unpause" : "Pause"}</Button>*/}
                        {/*</Grid.Row>*/}
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input type="text" name="name" id="email" placeholder="Name" value={this.state.name}
                               onChange={(e) => this.setState({name: e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Artist</label>
                        <input type="text" name="author" id="author"
                               placeholder="Author" value={this.state.author}
                               onChange={(e) => this.setState({author: e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Price (in Ether)</label>
                        <input type="text" name="price" id="price"
                               placeholder="In Ethereum" value={this.state.price}
                               onChange={(e) => this.setState({price: e.target.value})}/>
                    </Form.Field>
                    <Button fluid primary onClick={() => this.onSubmit()}>Submit</Button>

                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contract: state.contract,
    art: state.art,
    sale: state.auction
});
// const mapDispatchToProps = dispatch => bindActionCreators({
//     setSale,
//     setCore,
//     setTotal,
//     setAuctionTotal
// }, dispatch);

export default connect(
    mapStateToProps,
    null
)(Admin)
