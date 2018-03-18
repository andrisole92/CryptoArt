import React from "react";
import bem from 'bem-cn';
import {Button, Form, Message} from "semantic-ui-react";
import {push} from "react-router-redux";
import validator from 'email-validator';
import {connect} from "react-redux";
import axios from 'axios';
import utils from 'web3-utils';

import './SignIn.css';
import Globals from "../../Globals";
import {bindActionCreators} from "redux";
import {setEmail, setFullname, setSignedIn, setAddress} from "../../modules/account";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            fullName: "",
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {
        if (this.props.account.authenticated) {
            this.props.goTo('/my-gallery');
            return;
        }
        this.checkUser()
    }

    checkUser() {
        if (utils.isAddress(this.props.account.address)) {
            axios.post(Globals.serverUrl + '/user', {address: this.props.account.address}).then((r, e) => {
                let body = r.data;
                if (!body.error) {
                    this.onSignedIn(body.address, body.email, body.fullName);
                }
            });
        }
    }

    onSubmit() {
        if (this.state.email === "" || this.state.fullName === "" || !validator.validate(this.state.email)) return;
        this.setState({isLoading: true, error: null});
        let user = {address: this.props.account.address, email: this.state.email, fullName: this.state.fullName};
        axios.post(Globals.serverUrl + '/signup', user).then((r, e) => {
            let body = r.data;
            if (body.error) {
                this.setState({error: "Sorry, an error has occured.", isLoading: false})
            } else {
                this.onSignedIn(body.address, body.email, body.fullName);
            }
        });
    }

    onSignedIn(address, email, fullname) {
        this.props.setAddress(address);
        this.props.setEmail(email);
        this.props.setFullname(fullname);
        this.props.setSignedIn(true);
        this.props.goTo('/home')
    }

    render() {
        const block = bem("SignIn");

        let error = this.state.error === null ? null : <Message className={block('message')()} negative>
            <Message.Header>{this.state.error}</Message.Header>
        </Message>;

        return (
            <div className={block()}>
                {error}
                <Message
                    className={block('warning')()}
                    warning
                    header='Please make sure you’re logged in to MetaMask!'
                />
                <Form>
                    <Form.Field>
                        <label>Address:</label>
                        <input required type="text" name="name" id="email" placeholder="" disabled={true}
                               value={this.props.account.address}/>
                    </Form.Field>
                    <Form.Field>
                        <label>E-mail address:</label>
                        <input required type="email" name="email" id="email"
                               placeholder="E-mail" value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Full Name:</label>
                        <input required type="text" name="name" id="name"
                               placeholder="Full Name" value={this.state.fullName}
                               onChange={(e) => this.setState({fullName: e.target.value})}/>
                    </Form.Field>
                    <Button type="submit" loading={this.state.isLoading} fluid primary onClick={() => this.onSubmit()}>Submit</Button>

                </Form>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setEmail,
    setFullname,
    setAddress,
    setSignedIn,
    goTo: (route) => push(route)
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)
