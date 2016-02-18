/**
 * Created by jpa on 18/02/2016.
 */

class Editor extends Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            html: this.props.html || 'Edit me...'
        };
    }

    _handleChange() {
        console.log( '_handleChange' );
        // this.setState( { html: innerHTML } )
    };

    render() {
        const toolbar = <div></div>;
        return <TrixEditor
            toolbar={ toolbar }
            value={ this.state.html }
            onChange={ this._handleChange.bind( this ) }
        />
    }

}

