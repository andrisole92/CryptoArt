import React from "react";

import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import bem from 'bem-cn'

import './Header.css';
import {Menu} from "semantic-ui-react";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        }
    }

    render() {

        const block = bem("Header");
        let myCabinet = this.props.account.authenticated ?
            <Menu.Item name='myGallery' onClick={this.props.myCabinet}/> : null;
        let signin = this.props.account.authenticated ? null : <Menu.Item name='SignIn' onClick={this.props.signIn}/>;
        return (
            <div>
                <Menu pointing>
                    <Menu.Item className={block('logo')()} header onClick={this.props.home}><img
                        className={block('logo')('img')()} src="/img/logo.png"/> </Menu.Item>
                    <Menu.Item name='Marketplace' onClick={this.props.home}/>
                    {myCabinet}
                    <Menu.Menu position='right'>

                        <Menu.Item onClick={() => this.props.goTo('/FAQ')}>FAQ</Menu.Item>
                        {signin}
                    </Menu.Menu>
                </Menu>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
    goTo: (route) => push(route),
    home: () => push('/'),
    myCabinet: () => push('/my-gallery'),
    signIn: () => push('/sign-in'),
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header))

