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
                    <option value="hoeffding-tree">Hoeffding Tree </option>
                    <option value="k-means">K-Means</option>
                </select>
                <div>Description of {this.props.selected_algorithm}</div>
            </form>
        </ BorderWrapper>
        );
    }
}

export default Algorithm;