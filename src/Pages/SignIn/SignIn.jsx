import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Jumbotron} from "reactstrap";
import './SignIn.css';

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
                <Container>
                    <Form>
                        <FormGroup row>
                            <Label for="address" sm={2}>Address</Label>
                            <Col sm={10}>
                                <Input type="email" name="address" id="address" placeholder="0x90AC9caeC5A8816FebDDc6e066881F94C34fca19"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email" placeholder="E-mail"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="fullName" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="fullName" id="fullName"
                                       placeholder="Full Name"/>
                            </Col>
                        </FormGroup>
                    </Form>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Container>
            </div>

        );
    }
}

export default SignIn;
