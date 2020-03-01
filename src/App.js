import React from 'react';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import ProcessesList from './ProcessesList';
import DetailedView from './DetailedView';
import Evaluation from './Evaluation';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const KNOWN_DATASETS = {  
  "kdd99" : {
    valid_algorithms: ['hoeffding_tree', 'denstream','k_means', 'knn']
  },
  "kdd99raw" : {
    valid_algorithms: ['hoeffding_tree', 'denstream','k_means', 'knn']
  },
  "pnts_drifted" : {
    valid_algorithms: ['d3']
  },
  "pnts_stable" : {
    valid_algorithms: ['d3']
  }
}

// TODO: fundamental paramları ve defaultları ekle
const KNOWN_ALGORITHMS = {
  "hoeffding_tree" : {
    extra_parameters : ['max_sample', 'batch_size','restart_stream']
  },
  "d3" : {
    extra_parameters : ['w','auc']
  },
  "denstream" : {
    extra_parameters : []
  },
  "clustream" : {
    extra_parameters : []
  },
  "k_means" : {
    extra_parameters : ['max_iter','n_init', 'random_state']
  },
  "knn" : {
    fundamental_parameters: {'k': 3}, 
    extra_parameters : {'max_window_size': 10, 'max_sample': 20, 'batch_size': 20,'n_wait': 7,'max_time': 3}
  }
}

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
        selected_algorithm: 'hoeffding_tree',
        algorithm_parameters: {},
        process_list: [],
        selected_evaluation: 'prequential',
        selected_process: '',
        loading: false
    }
  }

  handleDatasetChange(event) {
    this.setState({selected_dataset: event.target.value, dataset_parameters: {}})
  }

  handleDatasetParameterChange(name, value){
    let param = {
      ...this.state.dataset_parameters
    }
    param[name] = value
    this.setState({dataset_parameters: param})
  }

  handleAlgorithmChange(event){
    let algorithm = event.target.value
    let parameters = {...KNOWN_ALGORITHMS[algorithm].fundamental_parameters, ...KNOWN_ALGORITHMS[algorithm].extra_parameters}
    this.setState({selected_algorithm: algorithm, algorithm_parameters: parameters})
  }

  handleAlgorithmParameterChange(name, value){
    let param = {
      ...this.state.algorithm_parameters
    }
    param[name] = value
    this.setState({algorithm_parameters: param})
  }

  handleEvaluationChange(event){
    this.setState({selected_evaluation: event.target.value})
  }

  startProcess(event){
    let new_process = {}

    new_process.dataset_name = this.state.selected_dataset
    new_process.algorithm_name = this.state.selected_algorithm
    new_process.dataset_parameters = this.state.dataset_parameters
    new_process.algorithm_parameters = this.state.algorithm_parameters
    new_process.selected_evaluation = this.state.selected_evaluation
    this.setState({loading: true})
    fetch('http://localhost:8000/api/new_job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_process) ,
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .then((data) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleShowDetails(id){
    let selectedprocess = this.state.process_list.filter((e) =>e.id ===id)
    this.setState({selected_process: selectedprocess[0]})
  }

  render(){
    return (
      <Container>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            APP_NAME
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Dataset selected_dataset={this.state.selected_dataset} 
                  parameters={this.state.dataset_parameters}
                  onDatasetChange={this.handleDatasetChange.bind(this)}
                  onParameterChange={this.handleDatasetParameterChange.bind(this)}/>
        </Box>
        <br />
        <Divider />
        <Box>
          <Algorithm selected_algorithm={this.state.selected_algorithm}
                  parameters = {this.state.algorithm_parameters}
                  onAlgorithmChange={this.handleAlgorithmChange.bind(this)}
                  onParameterChange={this.handleAlgorithmParameterChange.bind(this)}/>
        </Box>
        <br />
        <Divider />
        <Box>
          <Evaluation selected_evaluation={this.state.selected_evaluation}
                  onEvaluationChange={this.handleEvaluationChange.bind(this)}/>
        </Box>
        <br />
        <Grid item xs={12} sm={2}>
          <Button fullWidth variant="contained" onClick={this.startProcess.bind(this)}>Run</Button>
        </Grid>
        <hr />

        <Box>
          <ProcessesList process_list={this.state.process_list} 
                        showDetails={this.handleShowDetails.bind(this)}/>
        </Box>
        <br />
        <Divider />

        <Box>
          <DetailedView selected_process={this.state.selected_process}/>  
        </Box>
      </Container>
    );
  }


  componentDidMount(){
    this.fetchAllJobs()
    setInterval(this.fetchAllJobs.bind(this), 5000);
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
      return response.json()
    })
    .then(data => {
      this.setState({loading: false})
      this.setState({process_list: data.jobs})
    })
    .catch(e => {
      this.setState({loading: false})
      console.log(e)
    });
  }

  
  
}

export default App;
