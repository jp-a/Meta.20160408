import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import Visual from './visual/visual01'

console.log( '[Labs] render' );
render( (
    <div><Visual/></div>
), document.getElementById( 'root' ) );
