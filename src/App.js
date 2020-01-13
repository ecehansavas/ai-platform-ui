import React from 'react';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import ProcessesList from './ProcessesList';
import DetailedView from './DetailedView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: 3,      
        selected_dataset: 'kdd99',
        dataset_parameters: {stream_period: '0',
                            window_length: '10',
                            start_value: '0',
                            stop_value: '',
                            repeat_count: '1'},
        selected_algorithm: 'hoeffding-tree',
        algorithm_parameters: {},
        processList: [{id: '1',
                    dataset:'kdd99',
                    algorithm: 'KNN',
                    state: 'Completed'},

                    {id: '2',  
                    dataset:'kdd99-raw',
                    algorithm: 'hoeffding-tree',
                    state: 'In Progress'}],
        selected_process: ''
    }
  }

  handleDatasetChange(event) {
    this.setState({selected_dataset: event.target.value})
  }

  handleDatasetParameterChange(name, value){
    let param = {
      ...this.state.dataset_parameters
    }

    param[name] = value

    this.setState({dataset_parameters: param})
  }

  handleAlgorithmChange(event){
    this.setState({selected_algorithm: event.target.value})
  }

  startProcess(event){
    let new_process = {}
    new_process.id = this.state.id
    new_process.dataset = this.state.selected_dataset
    new_process.algorithm = this.state.selected_algorithm
    new_process.state = "In Queue"
    this.state.id = this.state.id+1
    this.setState({processList: this.state.processList.concat(new_process)})
  }

  handleShowDetails(id){
    let selectedprocess = this.state.processList.filter((e) =>e.id ===id)
    this.setState({selected_process: selectedprocess[0]})
  }

  render(){
    return (
      <div className="App">
        <Dataset selected_dataset={this.state.selected_dataset} 
                 onDatasetChange={this.handleDatasetChange.bind(this)}
                 onParameterChange={this.handleDatasetParameterChange.bind(this)}
                 />
        <Algorithm selected_algorithm={this.state.selected_algorithm}
                  onAlgorithmChange={this.handleAlgorithmChange.bind(this)}/>
        <button onClick={this.startProcess.bind(this)}>Run</button>
        <hr/>
        <ProcessesList processList={this.state.processList} 
                       showDetails={this.handleShowDetails.bind(this)}/>
        <DetailedView selected_process={this.state.selected_process} 
                      />  
      </div>
    );
  }
  
}

export default App;
