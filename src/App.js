import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import ProcessesList from './ProcessesList';
import DetailedView from './DetailedView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selected_dataset: 'kdd99',
        dataset_parameters: {},
        stream_period: '0',
        window_length: '10',
        start_value: '0',
        stop_value: '',
        repeat_count: '1',
        selected_algorithm: 'hoeffding-tree',
        algorithm_parameters: {},
    }
  }

  handleDatasetChange(event) {
    this.setState({selected_dataset: event.target.value})
  }

  handleStreamPeriodChange(event){
    this.setState({stream_period: event.target.value})
  }

  handleWindowChange(event){
    this.setState({window_length: event.target.value})
  }

  handleStartValueChange(event){
    this.setState({start_value: event.target.value})
  }

  handleStopValueChange(event){
    this.setState({stop_value: event.target.value})
  }

  handleRepeatCountChange(event){
    this.setState({repeat_count: event.target.value})
  }

  handleAlgorithmChange(event){
    this.setState({selected_algorithm: event.target.value})
  }


  render(){
    return (
      <div className="App">
        <Dataset selected_dataset={this.state.selected_dataset} 
                 onDatasetChange={this.handleDatasetChange.bind(this)}
                 onPeriodChange={this.handleStreamPeriodChange.bind(this)}
                 onWindowChange={this.handleWindowChange.bind(this)}
                 onStartChange={this.handleStartValueChange.bind(this)}
                 onStopChange={this.handleStopValueChange.bind(this)}
                 onRepeatCountChange={this.handleRepeatCountChange.bind(this)}
                 />
        <Algorithm selected_algorithm={this.state.selected_algorithm}
                  onAlgorithmChange={this.handleAlgorithmChange.bind(this)}/>
        <ProcessesList />
        <DetailedView />  
      </div>
    );
  }
  
}

export default App;
