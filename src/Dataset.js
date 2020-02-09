import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class Dataset extends React.Component {
    constructor(props) {
        super(props);
    }   

    render(){
        return (
        <BorderWrapper>
            <form>
                <div>Dataset Component</div>
                <label>Use Predefined Dataset: </label>
                <select value={this.props.selected_dataset} onChange={this.props.onDatasetChange}>
                    <option value="kdd99">KDD Cup 99</option>
                    <option value="kdd99_raw">KDD Cup 99 (RAW)</option>
                    <option value="pnts_drifted">PNTS DRIFTED</option>
                    <option value="pnts_stable">PNTS STABLE</option>
                </select>
                <div>Description of {this.props.selected_dataset}</div>
                <div>
                    <label>Stream Period: </label>
                    <input type="number" value={this.props.stream_period} onChange={(e) => this.props.onParameterChange("stream_period", e.target.value)}/>
                </div>
                <div>
                    <label>Window Length: </label>
                    <input type="number" value={this.props.window_length} onChange={(e) => this.props.onParameterChange("window_length", e.target.value)}/>
                </div>
                <div>
                    <label>Start:</label>
                    <input type="number" value={this.props.start_value} onChange={(e) => this.props.onParameterChange("start_value", e.target.value)} />
                </div>
                <div>
                    <label>Stop:</label>
                    <input type="number" value={this.props.stop_value} onChange={(e) => this.props.onParameterChange("stop_value", e.target.value)} />
                </div>
                <div>
                    <label>Repeat Count for Each Instance:</label>
                    <input type="number" value={this.props.repeat_count} onChange={(e) => this.props.onParameterChange("repeat_count", e.target.value)} />
                </div>
            </form>
        </ BorderWrapper>
        );
    }
}

export default Dataset;