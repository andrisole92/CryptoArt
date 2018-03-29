import React, {Component} from 'react';

import {Card} from 'semantic-ui-react';
import {connect} from 'react-redux'
import './Home.css';
import CardArt from "../../Components/CardArt";
import {addArt} from "../../modules/art";
import {bindActionCreators} from "redux";
import {addAuction} from "../../modules/auction";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        }
    }

    componentDidMount() {
    }


    render() {
        let cards = this.props.art.allArt.map((a) => <CardArt key={a.tokenId} price={a.lastPrice} tokenId={a.tokenId}
                                                              name={a.name} owner={a.owner} img="./img/lisa.jpg"
                                                              artist={a.artist}/>);

        return (
            <div className="home">
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
