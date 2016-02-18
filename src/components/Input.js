/**
 * Created by jpa on 18/02/2016.
 */

export default class Input extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            value: this.props.value || ''
        };
    }

    handleChange( _e ) {
        console.log( 'Input.handleChange(', _e.target.value, ')' );
        this.setState( { value: _e.target.value } );
    }

    handleBlur( _e ) {
        console.log( 'Input.handleBlur(', _e.target.value, ')' );
        if ( this.props.value != _e.target.value ) {
            this.setState( { value: _e.target.value } );
            this.props.onEdit( _e.target.value );
        }
    }

    render() {
        if ( this.state.value != this.props.value ) {
            console.log( 'Input', this.state.value, '|', this.props.value );
            this.setState( { value: this.props.value } );
        }
        return <span><input
            type='text'
            autoFocus='false'
            value={ this.state.value }
            onChange={ this.handleChange.bind( this ) }
            onBlur={ this.handleBlur.bind( this ) }
        /></span>
    }
}

