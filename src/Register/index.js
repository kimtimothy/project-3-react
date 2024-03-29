import React, { Component } from 'react';
import Image from '../images/lakers.jpg'
import './Register.css';
import { 
    Form, 
    Label, 
    Button,
    Segment 
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Image})`
}

class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
      }
    handleChange = (e) => { // allows us to see the state change in components 
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
      }

    handleSubmit = async (e) => {
      e.preventDefault();
      const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(this.state),
          headers: {
              'Content-Type' : 'application/json'
          }
      })
      const parsedResponse = await registerResponse.json();
      if(parsedResponse.status.message === 'Success'){
        this.setState({
          session: parsedResponse.session.username
        })
        localStorage.setItem('user', JSON.stringify(parsedResponse.session))
          this.props.doUpdateCurrentUser(parsedResponse.data) 
          this.props.history.push('/')
      }
    }
    render() {
        return (
          
          <div class="form">
          <Segment>
              <h2>Register</h2>
            <Form className='formfit' onSubmit={this.handleSubmit}>
            <Label> Username</Label>
            <Form.Input type='text' name="username" onChange={this.handleChange} />
            <Label> Email</Label>
            <Form.Input type='text' name="email" onChange={this.handleChange} />
            <Label> Password</Label>
            <Form.Input type='password' name="password" onChange={this.handleChange} />
            <Button type="Submit" color="black">Register</Button>
            </Form>
          </Segment>
          </div>
        
        )
        
    }
}


export default withRouter(Register);
