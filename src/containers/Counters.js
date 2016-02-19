import React, { Component } from 'react'
import { Link } from 'react-router'
import Counter from '../components/Counter'

export default class Counters extends Component {
    render() {
        return (
            <div>
                <Counter version={ '1.0' } increment={ 1 } color={ 'grey' }/>
                <Counter version={ '2.0' } increment={ 2 } color={ 'darkgrey' }/>
            </div>
        );
    }
}