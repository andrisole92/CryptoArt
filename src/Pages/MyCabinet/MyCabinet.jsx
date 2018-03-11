import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col, Jumbotron, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import './MyCabinet.css'
import classnames from 'classnames';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class MyCabinet extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeTab: '1'
        }
    }

    toggle(tab){
        this.setState({
            activeTab: tab
        })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">My Art</h1>
                </Jumbotron>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            My Art
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            For Sale
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Container>
                            <Row>
                                <Col md="4">
                                    <Card>
                                        <CardImg top width="100%"
                                                 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                                 alt="Card image cap"/>
                                        <CardBody>
                                            <CardTitle>Mona Lise</CardTitle>
                                            <CardSubtitle>Leonardo</CardSubtitle>
                                            <p>Last bought for: 1 Eth</p>
                                            <p>Current Price: 2 Eth</p>
                                            <Button>Buy For 2 Eth</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card>
                                        <CardImg top width="100%"
                                                 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                                 alt="Card image cap"/>
                                        <CardBody>
                                            <CardTitle>Mona Lise</CardTitle>
                                            <CardSubtitle>Leonardo</CardSubtitle>
                                            <CardText>Last bought for: 1 Eth</CardText>
                                            <CardText>Current Price: 2 Eth</CardText>
                                            <Button>Buy For 2 Eth</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card>
                                        <CardImg top width="100%"
                                                 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                                 alt="Card image cap"/>
                                        <CardBody>
                                            <CardTitle>Mona Lise</CardTitle>
                                            <CardSubtitle>Leonardo</CardSubtitle>
                                            <p>Last bought for: 1 Eth</p>
                                            <p>Current Price: 2 Eth</p>
                                            <Button>Buy For 2 Eth</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                        </Container>

                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default withRouter(connect(
    null,
    null
)(MyCabinet))
