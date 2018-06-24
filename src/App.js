import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import BusList from './components/BusList'
import Bus from './components/Bus'
import AddBus from './components/AddBus'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        date: new Date(),
        selectedBus: null
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleBusClick = this.handleBusClick.bind(this);
  }
  handleDayClick(day) {
    this.setState({ date: day });
  }
  handleBusClick(bus) {
    this.setState({ selectedBus: bus });
  } 
  render() {
    return (
      <Router>
        <Container text>
          <Switch>
            <Route path="/" 
              exact 
              render={
                (props)=><BusList 
                  date={this.state.date} 
                  onBusClick={this.handleBusClick}
                  onDayClick={this.handleDayClick}/>
              } 
            />
            <Route path="/bus" render={(props)=><Bus busId={this.state.selectedBus} />}/>
            <Route path="/addbus" render={(props)=><AddBus date={this.state.date} onDayClick={this.handleDayClick} />}/>
            <Redirect to="/" />
          </Switch> 
        </Container>
      </Router>
    );
  }
}

export default App;
