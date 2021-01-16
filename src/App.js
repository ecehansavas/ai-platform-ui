import React from 'react';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import ProcessesList from './ProcessesList';
import DetailedView from './DetailedView';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// eren: You can extract this into a seperate file
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

// eren: explain the structure in a comment
const KNOWN_DATASETS = {  
  "kdd99" : {
    valid_algorithms: ['hoeffding_tree_basic', 'hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'k_means', 'knn']
  },
  "stream1" : {
    valid_algorithms: ['d3', 'denstream', 'clustream', 'streamkm', 'hoeffding_tree_basic', 'hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'knn', 'k_means']
  },
  "stream2" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm', 'hoeffding_tree_basic', 'hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'knn', 'k_means']
  },
  "stable" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree_basic','hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'knn', 'k_means']
  },
  "electricity" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree_basic','hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'knn', 'k_means']
  },
  "covtype" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree_basic','hoeffding_tree_prequential', 'hoeffding_tree_holdout', 'knn', 'k_means']
  },
  "sea" : {
    fundamental_parameters: {'noise_percentage': 0.0, 'sample_size':300}, 
    valid_algorithms: ['hoeffding_tree_basic','hoeffding_tree_prequential', 'hoeffding_tree_holdout']
  },
  "hyperplane" : {
    fundamental_parameters: {'n_features': 10, 'n_drift_features':2, 'mag_change':0.0, 'noise_percentage':0.05, 'sigma_percentage':0.1, 'sample_size':300}, 
    valid_algorithms: ['hoeffding_tree_basic','hoeffding_tree_prequential', 'hoeffding_tree_holdout']
  }
}

const KNOWN_ALGORITHMS = {
  "hoeffding_tree_basic" : {
    extra_parameters : {'grace_period':200, 'tie_threshold':0.05, 'binary_split':false, 'remove_poor_atts': false, 'no_preprune':false, 'leaf_prediction': 'nba', 'nb_threshold': 0, 'max_sample':100000 }
  },
  "hoeffding_tree_prequential" : {
    extra_parameters : {'grace_period':200, 'tie_threshold':0.05, 'binary_split':false, 'remove_poor_atts': false, 'no_preprune':false, 'leaf_prediction': 'nba', 'nb_threshold': 0, 'pretrain_size':200 , 'max_sample': 100000, 'batch_size':1 , 'n_wait': 200 }
  },
  "hoeffding_tree_holdout" : {
    extra_parameters : {'grace_period':200, 'tie_threshold':0.05, 'binary_split':false, 'remove_poor_atts': false, 'no_preprune':false, 'leaf_prediction': 'nba', 'nb_threshold': 0, 'max_sample':100000, 'batch_size':1 ,'n_wait':10000 }
  },
  "d3" : {
    fundamental_parameters: {'rho': 0.1}, 
    extra_parameters : {'w':100,'auc':0.70}
  },
  "k_means" : {
    fundamental_parameters:{'n_cluster': 8},
    extra_parameters : { 'max_iter':300,'n_init':10}
  },
  "streamkm": {
    fundamental_parameters:{'n_cluster': 10, 'size_coreset':10000, 'part_size':1000}
  },
  "knn" : {
    fundamental_parameters: {'neighbors':5, 'max_window_size': 5000, 'leaf_size': 30, 'pretrain_size':200}, 
  },
  "denstream" : {
    fundamental_parameters: {'class':10, 'epsilon': 0.05, 'part_size':1000},
  },
  "clustream" : {
    fundamental_parameters: {'class':10, 'horizon': 100, 'm':100, 'part_size':1000},
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
        selected_dataset: 'kdd99',
        selected_generator: '',
        dataset_parameters: {start_value:0, stop_value:300},
        selected_algorithm: '',
        algorithm_parameters: {},
        process_list: [],
        selected_process: '',
        loading: false,
        is_dataset_generated: false,
        errors:[]
    }
    this.myRef=React.createRef(); // eren: why is this necessary? document
  }

  // eren: explain what each function does, why, etc.

  handleDatasetChange(event) {
    this.setState({selected_dataset: event.target.value, dataset_parameters: {}})
  }

  handleGeneratorChange(event) {
    let generator = event.target.value
    let parameters = {...KNOWN_DATASETS[generator].fundamental_parameters}
    this.setState({selected_generator: generator, dataset_parameters:parameters})
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

  handleShowDetails(id){ 
    let selectedprocess = this.state.process_list.filter((e) =>e.id ===id)
    this.setState({selected_process: selectedprocess[0]})
    window.scrollTo(0, this.myRef.current.offsetTop);
  }

  onDatasetTypeSelected(datasetType,expanded){
    if (datasetType==="predefined" || datasetType==="uploaded") // eren: extract to constants
      this.setState({is_dataset_generated: false, dataset_parameters: {}})
    else
      this.setState({is_dataset_generated: true, dataset_parameters: {}})
  }

  validateAndRun(event){
    if(this.validate())
      this.startProcess(event)
    else
      console.log("Invalid Area") // eren: needs to be developed
  }

  exists(context, x) {    
    return !!this.getParams(context)[x];
  }

  getParams(context) {
    switch (context) {
      case 'ds':
        return this.state.dataset_parameters;   
      case 'alg':
        return this.state.algorithm_parameters;
      default:
        return [];
    }
  }

  isInteger(context, x) {
    let intregex = /^([+-]?[1-9]\d*|0)$/;
    let strVal = this.getParams(context)[x].toString();
    return strVal.match(intregex);
  }

  isFloat(context, x){
    let floatregex = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/
    let strVal = this.getParams(context)[x].toString();
    return strVal.match(floatregex);
  }

  isLessThanZero(context, x){
    return (this.getParams(context)[x]) <0
  }

  validate(){
    let errors = []

// eren: complete it
// TODO: phase 2: kural fonksiyonlari yaz
//       phase 3: kural fonksiyonlarini on-the-fly kullan

    // Dataset areas
    if (this.exists('ds','start_value')) {
      if (!this.isInteger('ds','start_value')) {
        errors.push('Start must be integer') 
      }
      if (this.isLessThanZero('ds','start_value')) {
        errors.push('Start can not be less than zero')
      }
    }

    if(this.exists('ds','stop_value')){
      if(parseInt('stop_value')<0)
        errors.push('Start can not be less than zero') 
      if(!this.isInteger('ds','stop_value'))
        errors.push('Stop must be integer')
    }

    if (this.exists('ds','start_value') && this.exists('ds','stop_value') && 
    this.state.dataset_parameters['start_value'] > this.state.dataset_parameters['stop_value'])
      errors.push('Start can not be bigger than stop')

    if (this.exists('ds','sample_size')) {
      if (!this.isInteger('ds','sample_size')) {
        errors.push('Sample Size must be integer') 
      }
      if (this.isLessThanZero('ds','sample_size')) {
        errors.push('Sample Size can not be less than zero')
      }
    }

    if (this.exists('ds','n_features')) {
      if (!this.isInteger('ds','n_features')) {
        errors.push('Feature Count must be integer') 
      }
      if (this.isLessThanZero('ds','n_features')) {
        errors.push('Feature Count can not be less than zero')
      }
    }

    if (this.exists('ds','n_drift_features')) {
      if (!this.isInteger('ds','n_drift_features')) {
        errors.push('Drifted Feature Count must be integer') 
      }
      if (this.isLessThanZero('ds','n_drift_features')) {
        errors.push('Drifted Feature Count can not be less than zero')
      }
    }

    if (this.exists('ds','n_drift_features') & this.exists('ds','n_features')) {
      if(this.getParams('ds')['n_drift_features'] > this.getParams('ds')['n_features'] )
        errors.push('Drifted Feature Count can not be bigger than Feature Count')
    }

    if (this.exists('ds','start_value')) {
      if (!this.isInteger('ds','start_value')) {
        errors.push('Start must be integer') 
      }
      if (this.isLessThanZero('ds','start_value')) {
        errors.push('Start can not be less than zero')
      }
    }

    if (this.exists('ds','start_value')) {
      if (!this.isInteger('ds','start_value')) {
        errors.push('Start must be integer') 
      }
      if (this.isLessThanZero('ds','start_value')) {
        errors.push('Start can not be less than zero')
      }
    }
    
    if (this.exists('ds','noise_percentage')) {
      if (!this.isFloat('ds','noise_percentage')) {
        errors.push('Noise Percentage must be integer') 
      }
      if (this.isLessThanZero('ds','noise_percentage')) {
        errors.push('Noise Percentage can not be less than zero')
      }
    }

    if (this.exists('ds','sigma_percentage')) {
      if (!this.isFloat('ds','sigma_percentage')) {
        errors.push('Sigma Percentage must be integer') 
      }
      if (this.isLessThanZero('ds','sigma_percentage')) {
        errors.push('Sigma Percentage can not be less than zero')
      }
    }

    if (this.exists('ds','mag_change')) {
      if (!this.isFloat('ds','mag_change')) {
        errors.push('Mag Change must be integer') 
      }
      if (this.isLessThanZero('ds','mag_change')) {
        errors.push('Mag Change can not be less than zero')
      }
    }
    
    
    // Algorithms areas
    //hoeffding tree
    if(this.exists('alg', 'grace_period')){
      if(this.isLessThanZero('alg', 'grace_period'))
        errors.push('Grace Period can not be less than zero')
      if(!this.isInteger('alg','grace_period') )
        errors.push('Grace Period count must be integer') 
    }
    if(this.exists('alg', 'tie_threshold')){
      if(this.isLessThanZero('alg', 'tie_threshold'))
        errors.push('Tie Threshold can not be less than zero')
      if(!this.isFloat('alg','tie_threshold') )
        errors.push('Tie Threshold count must be integer') 
    }
    if(this.exists('alg', 'nb_threshold')){
      if(this.isLessThanZero('alg', 'nb_threshold'))
        errors.push('Naive Bayes Threshold can not be less than zero')
      if(!this.isInteger('alg','nb_threshold') )
        errors.push('Naive Bayes Threshold count must be integer') 
    }

  
    // knn
    if(this.exists('alg','pretrain_size')){
      if(this.isLessThanZero('alg','pretrain_size'))
        errors.push('Pretrain Size can not be less than zero')
      if(!this.isInteger('alg','pretrain_size') )
        errors.push('Pretrain Size count must be integer') 
    }
    if(this.exists('alg','leaf_size')){
      if(this.isLessThanZero('alg','leaf_size'))
        errors.push('Leaf Size can not be less than zero')
      if(!this.isInteger('alg','leaf_size'))
      errors.push('Fields must be integer') 
    }

    // k-means
    if(this.exists('alg','n_cluster')) {
      if(this.isLessThanZero('alg','n_cluster'))
        errors.push('Cluster Count can not be less than zero')
      if(!this.isInteger('alg','n_cluster'))
        errors.push('Cluster Count must be integer') 
    }
    if(this.exists('alg','max_iter')) {
      if(this.isLessThanZero('alg','max_iter'))
        errors.push('max_iter can not be less than zero')
      if(!this.isInteger('alg','max_iter'))
        errors.push('max_iter must be integer') 
    }
    if(this.exists('alg','n_init')){
      if(this.isLessThanZero('alg','n_init'))
        errors.push('n_init can not be less than zero')
      if(!this.isInteger('alg','n_init'))
        errors.push('n_init must be integer') 
    }

    // d3
    if(this.exists('alg','rho')) {
      if(this.isLessThanZero('alg','rho'))
        errors.push('Rho can not be less than zero')
      if(!this.isFloat('alg','rho'))
        errors.push('Rho must be float')
    }
    if(this.exists('alg','w')){
      if(this.isLessThanZero('alg','w'))
        errors.push('W can not be less than zero')
      if(!this.isInteger('alg','w'))
      errors.push('W must be integer')
    }
    if(this.exists('alg','auc')) {
      if(this.isLessThanZero('alg','auc'))
        errors.push('Auc can not be less than zero')
      if(!this.isFloat('alg','auc') )
        errors.push('Fields must be float')
    }

    // hoeffding tree prequential and holdout params
     if(this.exists('alg','pretrain_size')) {
      if(this.isLessThanZero('alg','pretrain_size'))
        errors.push('Pretrain Size can not be less than zero')
      if(!this.isInteger('alg','pretrain_size'))
        errors.push('Pretrain Size must be integer') 
    }
    if(this.exists('alg','max_sample')){
      if(this.isLessThanZero('alg','max_sample'))
        errors.push('Max Sample can not be less than zero')
      if(!this.isInteger('alg','max_sample'))
        errors.push('Max Sample must be integer') 
    }
    if(this.exists('alg','batch_size')){ 
      if(this.isLessThanZero('alg','batch_size'))
        errors.push('Batch Size can not be less than zero')
      if(!this.isInteger('alg','batch_size'))
        errors.push('Batch Size must be integer')
    }
      if(this.exists('alg','n_wait')){ 
        if(this.isLessThanZero('alg','n_wait'))
          errors.push('N Wait can not be less than zero')
        if(!this.isInteger('alg','n_wait'))
          errors.push('Fields must be integer') 
    }

    this.setState({errors:errors})
    console.log(errors)
    return errors.length === 0
  }

  startProcess(event){
    this.setState({loading: true})
    let new_process = {}
    
    if (this.state.is_dataset_generated === false)
      if(this.state.selected_dataset === "")
        return // eren: ugly
      else
        new_process.dataset_name = this.state.selected_dataset
    else
      new_process.dataset_name = this.state.selected_generator
      
    if(this.state.selected_algorithm === "")
      return
    
    new_process.algorithm_name = this.state.selected_algorithm
    new_process.dataset_parameters = this.state.dataset_parameters
    new_process.algorithm_parameters = this.state.algorithm_parameters
    
    console.log("backend is " + process.env.REACT_APP_BACKEND_URL)

    this.setState({loading: true})
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/new_job', { // eren: we need to change the url to an environment variable parameter value
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_process) ,
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .then((data) => {
      this.fetchAllJobs()
    })
    .catch((error) => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  

  deleteItem(id){
    this.setState({loading: true})
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete_job/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .then((data) => {
      this.fetchAllJobs()
    })
    .catch((error) => {
      console.log(error)
      this.setState({loading: false})
    })
  }


  // eren: run a linter

  render(){

    // eren: let's give this app a name
    return (
      <Container>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            ESTRA 
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
                  is_dataset_generated = {this.state.is_dataset_generated}
                  parameters = {this.state.algorithm_parameters}
                  onAlgorithmChange={this.handleAlgorithmChange.bind(this)}
                  onParameterChange={this.handleAlgorithmParameterChange.bind(this)}/>
        </Box>
        <br />
        <Divider />
        <br />
        <Grid item xs={12} sm={2}>
          <Button fullWidth variant="contained" onClick={this.validateAndRun.bind(this)}>Run
            <PlayArrowIcon />
          </Button>
        </Grid>
        <hr />
        <Box>
          <ProcessesList process_list={this.state.process_list}
                        selected_generator = {this.state.selected_generator} 
                        showDetails={this.handleShowDetails.bind(this)}
                        delete = {this.deleteItem.bind(this)}/>
        </Box>
        <br />
        <Divider />

        <Box>
          <div ref={this.myRef}>
            <DetailedView selected_process={this.state.selected_process}/>  
          </div>
        </Box>
        <br />
        <br />
        <Copyright />
      </Container>
      
    );
  }

  // eren: Organize the file into sections (event handler functions, API interaction functions, etc.)


  componentDidMount(){
    this.fetchAllJobs()
      setInterval(this.fetchAllJobs.bind(this), 2000);
  }

  fetchAllJobs(){
    console.log("backend is " + process.env.REACT_APP_BACKEND_URL)

    this.setState({loading: true})
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/jobs', {
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
      if (this.state.selected_process)
      {
        let selectedprocess = data.jobs.filter((e) =>e.id === this.state.selected_process.id)
        if (selectedprocess.length > 0)
          this.setState({selected_process: selectedprocess[0]})
      }
    })
    .catch(e => {
      this.setState({loading: false})
      console.log(e)
    });
  }

  
  
}

export default App;
