import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import bem from 'bem-cn';

import './MyGallery.css'
import {setTokens} from "../../modules/account";
import {bindActionCreators} from "redux";
import {Card} from 'semantic-ui-react'
import CardArt from "../../Components/CardArt/CardArt";
import MyCard from "../../Components/MyCard/MyCard";


class MyGallery extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tokens: []
        }
    }

    componentDidMount(){
        this.props.contract.core.methods.tokensOfOwner(this.props.account.address).call({from: window.web3.eth.defaultAccount}).then((r)=>{
            this.props.setTokens(r);
            for (let i = 0; i < r.length; i++) {
                this.props.contract.core.methods.getKitty(r[i]).call({from: window.web3.eth.defaultAccount}).then((t) => {
                    console.log(t);
                    t.tokenId = r[i];
                    this.setState({tokens: this.state.tokens.concat(t)});
                })
            }
            return null;
        })
    }

    onSell(tokenId){

    }

    render() {
        let cards = this.state.tokens.map((a) => <MyCard key={a.tokenId} price={a.lastPrice} tokenId={a.tokenId}
                                                          name={a.name} owner={a.owner} img="/img/lisa.jpg"
                                                          artist={a.author}/>);
        const block = bem('MyGallery');
        return (
            <div className={block()}>
                <p>My Gallery</p>
                <Card.Group className="ui container center aligned" itemsPerRow={4} stackable={true} doubling={true}>

                    {cards}
                </Card.Group>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    contract: state.contract
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setTokens
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGallery))
