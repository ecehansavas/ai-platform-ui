import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class Dataset extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <form>
            <BorderWrapper>
                <div>Dataset Component</div>
                <label>Use Predefined Dataset: </label>
                <select value={this.props.selected_dataset} onChange={this.props.onDatasetChange}>
                    <option value="kdd99">KDD Cup 99</option>
                    <option value="kdd99-raw">KDD Cup 99 (RAW)</option>
                </select>
                <div>Description of {this.props.selected_dataset}</div>
                {/* <div>
                    <label>Stream Period: </label>
                    <input type="number" value={this.props.stream_period} onChange={this.props.onPeriodChange}/>
                </div>
                <div>
                    <label>Window Length: </label>
                    <input type="number" value={this.props.window_length} onChange={this.props.onWindowChange}/>
                </div>
                <div>
                    <label>Start:</label>
                    <textarea value={this.props.start_value} onChange={this.props.onStartChange} />
                </div>
                <div>
                    <label>Stop:</label>
                    <textarea value={this.props.stop_value} onChange={this.props.onStopChange} />
                </div>
                <div>
                    <label>Repeat Count for Each Instance:</label>
                    <textarea value={this.props.repeat_count} onChange={this.props.onRepeatCountChange} />
                </div> */}
            </BorderWrapper>
        </form>
        );
    }
}

export default Dataset;