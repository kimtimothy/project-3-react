import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventContainer from './EventContainer';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import NavHeader from './Header';
import EventShow from './EventShow';
import CreateEvent from './CreateEventForm';
// import NavBar from './NavBar'


const My404 = () => {
  return (
    <div>
      You are lost lil buddy : /
    </div>
    )
};

class App extends Component {
  state = {
    currentUser: {},
    username: '',
    logged: false,
    eventsCreated: [],
    sport: '',
    teams: '',
    date: '',
    time: '',
    location: '',
    tickets: '',
    id: ''
  }
  
  doUpdateCurrentUser = (user) => {
    console.log(user)
    this.setState({
      currentUser : user
    })
  }
  logout = async () => {
    this.setState({
      username: '',
      logged: false
    })
    const logoutResponse = fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedResponse = await logoutResponse.json();
      if(parsedResponse.status.code === 200){
        this.props.doUpdateCurrentUser(parsedResponse.data)
        this.props.history.push('/')
      }
  }
  componentDidMount(){
    this.getEvents();
  }

  getEvents = async () => {
    try {
      const events = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`);
      const parsedEvents = await events.json();
      this.setState({
        eventsCreated: parsedEvents.data
      })
    } catch(err){
      console.log(err);
    }
  }

  addEvent = async (e, eventFromForm) => {
    e.preventDefault();
    console.log(eventFromForm)

    try {
      const createdEventResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/`, { 
          method: 'POST',
          body: JSON.stringify(eventFromForm),
          headers: {
              'Content-Type': 'application/json'
          }
      })
     
      const parsedResponse = await createdEventResponse.json();
      console.log(parsedResponse, ' im a response')

      this.setState({events: [...this.state.eventsCreated, parsedResponse.data]})
      this.props.history.push('/')

  } catch(err){
      console.log('error')
      console.log(err)
  }
}

  render() {
    console.log(this.state.currentUser.is_admin, '<-----is_admin?')
    console.log(this.state.logged, '<-----logge?')
  return ( 
    <main> 
      <NavHeader currentUser = {this.state.currentUser} />
      
      <Switch> 
        <Route exact path='/' render={() => <EventContainer eventsCreated={this.state.eventsCreated}/>} />
      
      {  this.state.currentUser.is_admin || this.state.logged ? '' :
        <Route exact path='/events/new' render={() => <CreateEvent  addEvent={this.addEvent}/>} />
      }
        <Route exact path='/register' render={() => <Register doUpdateCurrentUser = {this.doUpdateCurrentUser} />} />
        <Route exact path='/login' render={() => <Login doUpdateCurrentUser = {this.doUpdateCurrentUser} />} />
        <Route exact path='/events/:id' component={EventShow} />
        <Route component={My404} />
      </Switch>
    </main>
    )
  }
}

export default withRouter(App);
