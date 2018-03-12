import React    from "react";

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import bem from 'bem-cn'

import './Header.css';
import {Menu} from "semantic-ui-react";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collapsed: true
        }
    }
    render() {

        const block = bem("Header");
        return (
            <div>
                <Menu>
                    <Menu.Item className={block('logo')()} header onClick={this.props.home}><img className={block('logo')('img')()} src="/img/logo.png"/> </Menu.Item>
                    <Menu.Item name='myCabinet' onClick={this.props.myCabinet}/>
                    <Menu.Item name='SignIn' onClick={this.props.signIn}/>
                </Menu>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    home: () => push('/'),
    myCabinet: () => push('/my-cabinet'),
    signIn: () => push('/sign-in'),
}, dispatch);

export default withRouter(connect(
    null,
    mapDispatchToProps
)(Header))

