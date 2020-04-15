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
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ecehansavas">
        Ecehan SAVAS BASAK
      </Link>{' '}
      <br />
      {new Date().getFullYear()}
    </Typography>
  );
}

const KNOWN_DATASETS = {  
  "kdd99" : {
    valid_algorithms: ['hoeffding_tree', 'denstream','k_means', 'knn', 'half_space_tree']
  },
  "kdd99raw" : {
    valid_algorithms: ['hoeffding_tree', 'denstream','k_means', 'knn', 'half_space_tree']
  },
  "pnts_drifted" : {
    valid_algorithms: ['d3']
  },
  "pnts_stable" : {
    valid_algorithms: ['d3']
  },
  "sea" : {
    valid_algorithms: ['hoeffding_tree', 'knn', 'half_space_tree']
  },
  "hyperplane" : {
    valid_algorithms: ['hoeffding_tree', 'knn', 'half_space_tree']
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
  },
  "half_space_tree":{
    fundamental_parameters: [], 
    extra_parameters : {'n_features':1, 'window_size': 250, 'depth':15, 'n_estimators':25, 'size_limit':50, 'anomaly_threshold':0.5}
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
        selected_dataset: '',
        selected_generator: '',
        dataset_parameters: {},
        selected_algorithm: '',
        algorithm_parameters: {},
        process_list: [],
        selected_evaluation: '',
        selected_process: '',
        loading: false,
        is_dataset_generated: false
    }
    this.myRef=React.createRef();
  }

  handleDatasetChange(event) {
    this.setState({selected_dataset: event.target.value, dataset_parameters: {}})
  }

  handleGeneratorChange(event) {
    this.setState({selected_generator: event.target.value})
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

  onDatasetTypeSelected(datasetType,expanded){
    if (datasetType=="predefined")
      this.setState({is_dataset_generated: false, dataset_parameters: {}})
    else
      this.setState({is_dataset_generated: true, dataset_parameters: {}})
  }

  startProcess(event){
    let new_process = {}

    new_process.dataset_name = this.state.selected_dataset
    new_process.algorithm_name = this.state.selected_algorithm
    new_process.dataset_parameters = this.state.dataset_parameters
    new_process.algorithm_parameters = this.state.algorithm_parameters
    new_process.selected_evaluation = this.state.selected_evaluation
    new_process.selected_generator = this.state.selected_generator
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
    window.scrollTo(0, this.myRef.current.offsetTop);
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
                  selected_generator = {this.state.selected_generator}
                  is_dataset_generated = {this.state.is_dataset_generated}
                  parameters={this.state.dataset_parameters}
                  onDatasetChange={this.handleDatasetChange.bind(this)}
                  onParameterChange={this.handleDatasetParameterChange.bind(this)}
                  onGeneratorChange={this.handleGeneratorChange.bind(this)}
                  onDatasetTypeSelected= {this.onDatasetTypeSelected.bind(this)}
                  />
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
          <div ref={this.myRef}>
            <DetailedView selected_process={this.state.selected_process}/>  
          </div>
        </Box>
        <Copyright />
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
