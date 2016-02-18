/**
 * Created by jpa on 18/02/2016.
 */
import React, { Component } from 'react'
import Navigation from './Navigation'
import Counters from './Counters'

export default class About extends Component {
    render() {
        return <div>
            <Navigation/>
            <span>About</span>
            <Counters/>
        </div>
    }
}
