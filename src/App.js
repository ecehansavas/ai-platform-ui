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
        selected_dataset: 'kdd99',
        dataset_parameters: {stream_period: '0',
                            window_length: '10',
                            start_value: '0',
                            stop_value: '',
                            repeat_count: '1'},
        selected_algorithm: 'hoeffding-tree',
        algorithm_parameters: {},
        process_list: [],
        selected_process: '',
        loading: false
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

    new_process.dataset_name = this.state.selected_dataset
    new_process.algorithm_name = this.state.selected_algorithm
    new_process.dataset_parameters = this.state.dataset_parameters
    new_process.algorithm_parameters = this.state.algorithm_parameters
    this.setState({loading: true})
    fetch('http://localhost:8000/api/new_job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_process) ,
      credentials: 'same-origin',
      cache: 'no-cache'
    }).then(this.setState({loading: true}))
    
    this.fetchAllJobs()
  }

  handleShowDetails(id){
    let selectedprocess = this.state.process_list.filter((e) =>e.id ===id)
    this.setState({selected_process: selectedprocess[0]})
  }

  render(){
    console.log("in render")
    console.log(this.state.process_list)
    return (
      <div className="App">
        <Dataset selected_dataset={this.state.selected_dataset} 
                 onDatasetChange={this.handleDatasetChange.bind(this)}
                 onParameterChange={this.handleDatasetParameterChange.bind(this)}/>
        <Algorithm selected_algorithm={this.state.selected_algorithm}
                  onAlgorithmChange={this.handleAlgorithmChange.bind(this)}/>
        <button onClick={this.startProcess.bind(this)}>Run</button>
        <hr/>
        <ProcessesList process_list={this.state.process_list} 
                       showDetails={this.handleShowDetails.bind(this)}/>
        <DetailedView selected_process={this.state.selected_process}/>  
      </div>
    );
  }


  componentDidMount(){
    this.fetchAllJobs()
  }

  fetchAllJobs(){
    this.setState({loading: true})
    fetch('http://localhost:8000/api/jobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=> {
      console.log("in response")
      console.log(response)
      return response.json()
    })
    .then(data => {
      this.setState({loading: false})
      console.log("received data: ")
      console.log(data)
      this.setState({process_list: data.jobs})
    })
    .catch(e => {
      this.setState({loading: false})
      console.log("in error")
      console.log(e)
    });
  }

  
}

export default App;
