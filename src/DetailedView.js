import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
            <BorderWrapper>
                <form>
                    <div>Details are here</div>
                    <div>Selected Dataset: {this.props.selected_process.dataset}</div>
                    <div>Selected Algorithm: {this.props.selected_process.algorithm}</div>
                </form>
            </BorderWrapper>
            
        );
    }
}

export default DetailedView;