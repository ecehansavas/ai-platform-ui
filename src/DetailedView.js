import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
            <form>
                <BorderWrapper>
                    <div>Details are here</div>

                </BorderWrapper>
            </form>
            
        );
    }
}

export default DetailedView;