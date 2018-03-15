import React from "react";
import bem from 'bem-cn';
import {Button, Form} from "semantic-ui-react";
import {connect} from "react-redux";

import './SignIn.css';


class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            fullName: ""
        }
    }

    onSubmit(){
        // Save in MongoDB
    }

    render() {
        const block = bem("SignIn");

        return (
            <div className={block()}>
                <Form>
                    <Form.Field>
                        <label>Address:</label>
                        <input type="text" name="name" id="email" placeholder="" disabled={true} value={this.props.account.address}/>
                    </Form.Field>
                    <Form.Field>
                        <label>E-mail address:</label>
                        <input type="email" name="email" id="email"
                               placeholder="E-mail" value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Full Name:</label>
                        <input type="text" name="name" id="name"
                               placeholder="Full Name" value={this.state.fullName}
                               onChange={(e) => this.setState({fullName: e.target.value})}/>
                    </Form.Field>
                    <Button fluid primary onClick={() => this.onSubmit()}>Submit</Button>

                </Form>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    account: state.account
});



export default connect(
    mapStateToProps,
    null
)(SignIn)
