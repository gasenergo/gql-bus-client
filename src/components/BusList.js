import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getBusesQuery } from '../queries/queries';
import { Link } from 'react-router-dom'
import { Header, Segment, Card} from 'semantic-ui-react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class BusList extends Component {
    render(){
        return(
            <div>
                <Segment raised className='calendarBlock'>
                    <div className='date'>
                        <Header as='h1'>{this.props.date.getDate()}</Header>
                        <Header as='h3'>{this.props.date.toLocaleString('en-es', { month: "long" })}</Header> 
                    </div>
                    <div className='calendar'>
                        <DayPicker onDayClick={this.props.onDayClick} />
                    </div>
                </Segment>
                <Query 
                    query={ getBusesQuery } 
                    variables= { {date: this.props.date.toLocaleDateString("en-GB")} }
                >
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return data.buses.map(bus => (
                            <Card as="div" key={ bus.id } onClick={()=>this.props.onBusClick(bus.id)} fluid>
                                <Card.Content>
                                    <Card.Header>{ bus.route }</Card.Header>
                                    <Card.Meta>{bus.date}</Card.Meta>
                                    <Card.Meta>{bus.time}</Card.Meta>
                                    <Card.Description>{bus.description}</Card.Description>
                                </Card.Content>
                                <Link to="/bus" className="divLink" />
                            </Card>
                        ));
                    }}
                </Query>
                <Link className='addBusLink' to="/addbus">+</Link>
            </div>
        );
    }
}

export default BusList;