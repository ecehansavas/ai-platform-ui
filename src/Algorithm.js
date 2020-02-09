import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class Algorithm extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
        <BorderWrapper>
            <form>
                <div>Dataset Component</div>
                <label>Algorithm:</label>
                <select value={this.props.selected_algorithm} onChange={this.props.onAlgorithmChange}>
                    <option value="hoeffding_tree">Hoeffding Tree </option>
                    <option value="k_means">K-Means</option>
                    <option value="d3">D3</option>
                </select>
                <div>Description of {this.props.selected_algorithm}</div>
            </form>
        </ BorderWrapper>
        );
    }
}

export default Algorithm;