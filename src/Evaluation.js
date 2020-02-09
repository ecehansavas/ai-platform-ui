import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class Evaluation extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
        <BorderWrapper>
            <form>
                <div>Evaluation</div>
                <select value={this.props.selected_evaluation} onChange={this.props.onEvaluationChange}>
                    <option value="prequential">Prequential</option>
                    <option value="holdout">Holdout</option>
                </select>
            </form>
        </ BorderWrapper>
        );
    }
}

export default Evaluation;