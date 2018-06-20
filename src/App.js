import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getBusesQuery } from './queries/queries';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Query 
          query={ getBusesQuery } 
          variables= { {date: '18/06/2018'} }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.buses.map(bus => (
              <div key={ bus.id }>
                <p>{ bus.route }</p>
              </div>
            ));
          }}
        </Query>

      </div>
    );
  }
}

export default App;
