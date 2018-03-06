import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Jumbotron, Row} from "reactstrap";

import './Admin.css'

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Mohnatik",
            author: "Abcde",
            price: "1",
            paused: null,
            coreBalance: 0,
            saleBalance: 0,
            totalSupply: 0
        }
    }

    componentDidMount() {
        this.checkContractsReady();

    }

    checkContractsReady() {
        console.log("checkContractsReady");
        if (window.core !== 'undefined' && window.core !== undefined && window.sale !== undefined && window.sale !== 'undefined') {
            let core = window.core;
            let sale = window.sale;
            let web3 = window.web3;
            this.getPaused();
            this.getTotalSupply();
            web3.eth.getBalance(core.address).then((res) => this.setState({coreBalance: res}));
            web3.eth.getBalance(sale.address).then((res) => this.setState({saleBalance: res}));
        } else {
            setTimeout(() => this.checkContractsReady(), 1000);
        }
    }

    onSubmit() {
        if (!window.core) {
            alert("Can't find the contract");
        } else {
            this.createPainting();
        }
    }

    createPainting() {
        let web3 = window.web3;
        const core = window.core;
        core.createGen0Auction(this.state.name, this.state.author, parseInt(web3.utils.toWei(this.state.price,"ether"),10), {from: web3.eth.defaultAccount}).then((res) => {
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
            <div className="adminPage">
                <Jumbotron>
                    <h1 className="display-3">Hi Rob</h1>
                    <p>Use this page to add more art.</p>
                    <p>Only your wallet address can do it.</p>
                    <p>It costs gas to write something to Blockchain.</p>
                    <p>Core Balance: {this.state.coreBalance}</p>
                    <p>Sale Balance: {this.state.saleBalance}</p>
                    <p>Total Supply: {this.state.totalSupply}</p>
                    <Row>
                        <Button onClick={() => this.onPause()}>{this.state.paused ? "Unpause" : "Pause"}</Button>
                    </Row>
                </Jumbotron>
                <Container>
                    <Form>
                        <FormGroup row>
                            <Label for="email" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" id="email" placeholder="Name" value={this.state.name}
                                       onChange={(e) => this.setState({name: e.target.value})}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="fullName" sm={2}>Author</Label>
                            <Col sm={10}>
                                <Input type="text" name="author" id="author"
                                       placeholder="Author" value={this.state.author}
                                       onChange={(e) => this.setState({author: e.target.value})}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="price" sm={2}>Price</Label>
                            <Col sm={10}>
                                <Input type="text" name="price" id="price"
                                       placeholder="In Ethereum" value={this.state.price}
                                       onChange={(e) => this.setState({price: e.target.value})}/>
                            </Col>
                        </FormGroup>
                    </Form>
                    <FormGroup check row>
                        <Col sm={{size: 10, offset: 2}}>
                            <Button onClick={() => this.onSubmit()}>Create</Button>
                        </Col>
                    </FormGroup>
                </Container>
            </div>
        );
    }
}

export default Admin;
