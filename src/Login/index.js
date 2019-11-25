import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css'
import { 
    Form, 
    Label, 
    Button,
    Segment
} from 'semantic-ui-react';

class Login extends Component {
    state = {
        username: '',
        password: '',
        is_admin: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    render(){
        return(
        <Segment className='loginform'>
            <h2>Login</h2>
            <Form onSubmit={(e) => this.props.login(e, this.state)}>
            <Label> Username</Label>
            <Form.Input type='text' name="username" value={this.state.username} onChange={this.handleChange}/>
            <Label> Password</Label>
            <Form.Input className='black' type='password' name="password" value={this.state.password} onChange={this.handleChange} />
            <Button type="Submit" color="black">Login</Button>
            </Form>
        </Segment>
        )
    }

}

export default withRouter(Login)