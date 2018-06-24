import React, { Component } from 'react';
import { addPassengerMutation, getBusQuery } from '../queries/queries';
import { Query, Mutation} from 'react-apollo';
import { Button, Form, Segment, Image } from 'semantic-ui-react'
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import iveco from '../busIveco.jpg';
import car from '../car.jpg';


class Bus extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
            seatNum: ''
        };
        this.handleSeatClick=this.handleSeatClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        
    }

    handleSeatClick(seat) {
        this.setState({ seatNum: seat });
    }

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    }

    render(){
        return(
                <Query 
                    query={ getBusQuery } 
                    variables= { {id: this.props.busId} }
                >
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let dummyPassengers;
                        let vehiclePict;
                        switch(data.bus.vehicle){
                            case "car" :
                                dummyPassengers = [
                                    {id:1, name: null, phone: null, seatNum: 1},
                                    {id:2, name: null, phone: null, seatNum: 2},
                                    {id:3, name: null, phone: null, seatNum: 3},
                                    {id:4, name: null, phone: null, seatNum: 4}
                                ];
                                vehiclePict = car;
                                break;
                            case "iveco" :
                                dummyPassengers = [
                                    {id:1, name: null, phone: null, seatNum: 1},
                                    {id:2, name: null, phone: null, seatNum: 2},
                                    {id:3, name: null, phone: null, seatNum: 3},
                                    {id:4, name: null, phone: null, seatNum: 4},
                                    {id:5, name: null, phone: null, seatNum: 5},
                                    {id:6, name: null, phone: null, seatNum: 6},
                                    {id:7, name: null, phone: null, seatNum: 7},
                                    {id:8, name: null, phone: null, seatNum: 8},
                                    {id:9, name: null, phone: null, seatNum: 9},
                                    {id:10, name: null, phone: null, seatNum: 10},
                                    {id:11, name: null, phone: null, seatNum: 11},
                                    {id:12, name: null, phone: null, seatNum: 12},
                                    {id:13, name: null, phone: null, seatNum: 13},
                                    {id:14, name: null, phone: null, seatNum: 14},
                                    {id:15, name: null, phone: null, seatNum: 15}
                                ]
                                vehiclePict = iveco;
                                break;
                            default:
                                dummyPassengers = [
                                    {id:1, name: null, phone: null, seatNum: 1},
                                    {id:2, name: null, phone: null, seatNum: 2},
                                    {id:3, name: null, phone: null, seatNum: 3},
                                    {id:4, name: null, phone: null, seatNum: 4}
                                ]
                                break;
                        }
                        let passengers = sortBy(uniqBy([...data.bus.passengers,...dummyPassengers],'seatNum'), p => p.seatNum)

                        return (
                        <div>
                            
                            <Segment className={data.bus.vehicle} >
                                <Image src={vehiclePict} fluid/>
                                { passengers.map(passenger => {
                                    return <Button 
                                    key={passenger.id} 
                                    className={'seatNum'+passenger.seatNum}
                                    onClick={()=>this.handleSeatClick(passenger.seatNum)}
                                    active={this.state.seatNum===passenger.seatNum} 
                                    disabled = {passenger.name !== null}>{ passenger.seatNum }</Button>
                                })}
                            </Segment>
                            <Mutation mutation ={ addPassengerMutation }>
                            {(AddPassenger, {data})=>(
                                <Form onSubmit={ e=>{
                                    e.preventDefault();
                                    AddPassenger({
                                        variables: {
                                            name: this.state.name,
                                            phone: this.state.phone,
                                            seatNum: this.state.seatNum,
                                            busId: this.props.busId,
                                        },
                                        refetchQueries: [{ query: getBusQuery,variables: ({id: this.props.busId}) }],
                                    });
                                    this.setState({ name: '' });
                                    this.setState({phone:''});
                                    this.setState({seatNum:''});
                                }}>
                                <Form.Input placeholder='Enter your name' name='name' value={this.state.name} onChange={this.handleChange} />
                                <Form.Input placeholder='Enter your phone number' name='phone' value={this.state.phone} onChange={this.handleChange} />
                                <Button type='submit'>Submit</Button>
                            </Form>
                            )} 
                            </Mutation>
                        </div>
                        );
                    }}
                </Query>
        );
    }
}

export default Bus;









