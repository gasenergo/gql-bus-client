import React, { Component } from 'react';
import { Mutation} from 'react-apollo';
import { addBusMutation,  getBusesQuery } from '../queries/queries';
import { Form, Segment, Header } from 'semantic-ui-react'
import DayPicker from 'react-day-picker';

class AddBus extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: '',
            route: '',
            vehicle: '',
            description: ''
        };
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleDayClick(day) {
        this.setState({ date: day });
    }
    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    }
    
    render(){
        const { route, time, vehicle, description} = this.state
        const vehicles = [
            {key: '1', text: 'Car', value: 'car'},
            {key: '2', text: 'Iveco', value: 'iveco'}
        ]
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
                <Mutation mutation={addBusMutation}>
                    {(AddBus, { data }) => (
                        <Form
                            onSubmit={e => {
                                AddBus({
                                    variables: {
                                        date: this.props.date.toLocaleDateString("en-GB"),
                                        time: this.state.time,
                                        route: this.state.route,
                                        vehicle: this.state.vehicle,
                                        description: this.state.description
                                    },
                                    refetchQueries: [{ query: getBusesQuery,variables: ({date: this.props.date.toLocaleDateString("en-GB")}) }]
                                });
                                this.setState({ time: '' });
                                this.setState({route: ''});
                                this.setState({vehicle: ''});
                                this.setState({description: ''});
                            }}
                        >
                            <Form.Input placeholder='Route' name='route' value={route} onChange={this.handleChange} />
                            <Form.Input placeholder='Time' name='time' value={time} onChange={this.handleChange} />
                            <Form.Select placeholder='Vehicle' name='vehicle' options={vehicles} value={vehicle} onChange={this.handleChange} />
                            <Form.TextArea placeholder='Description' name='description' value={description} onChange={this.handleChange} />
                            <Form.Button content='Submit' />
                        </Form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default AddBus;


