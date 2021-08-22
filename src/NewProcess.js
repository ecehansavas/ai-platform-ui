import React from 'react';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import Review from './Review';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

/**
 *  Available predefined datasets and dataset generators in ESTRA 
 *  Each dataset's valid algorithms are given because any algorithm is not suitable for any dataset.
 *  For dataset generators, available parameters and their default values are given.
 */
const KNOWN_DATASETS = {  
  "kdd99_full_labeled" : {
    valid_algorithms: ['hoeffding_tree','k_means', 'knn']
  },
  "stream1" : {
    valid_algorithms: ['d3', 'denstream', 'clustream', 'streamkm', 'hoeffding_tree',  'knn', 'k_means']
  },
  "stream2" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm', 'hoeffding_tree', 'knn', 'k_means']
  },
  "stable" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree','knn', 'k_means']
  },
  "electricity" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree', 'knn', 'k_means']
  },
  "covtype" : {
    valid_algorithms: ['d3','denstream', 'clustream', 'streamkm','hoeffding_tree','knn', 'k_means']
  },
  "sea" : {
    fundamental_parameters: {'noise_percentage': 0.0, 'sample_size':300}, 
    valid_algorithms: ['hoeffding_tree']
  },
  "hyperplane" : {
    fundamental_parameters: {'n_features': 10, 'n_drift_features':2, 'mag_change':0.0, 'noise_percentage':0.05, 'sigma_percentage':0.1, 'sample_size':300}, 
    valid_algorithms: ['hoeffding_tree']
  }
}

/**
 *  Available algorithms in ESTRA with editable parameters
 *  Default values of the parameters are given.
 */
const KNOWN_ALGORITHMS = {
  "hoeffding_tree" : {
    extra_parameters : {'grace_period':200, 'tie_threshold':0.05, 'nb_threshold': 0 }
  },
  "d3" : {
    fundamental_parameters: {'rho': 0.1}, 
    extra_parameters : {'w':100, 'auc':0.70}
  },
  "k_means" : {
    fundamental_parameters:{'n_cluster': 8},
    extra_parameters : { 'max_iter':300, 'n_init':10}
  },
  "streamkm": {
    fundamental_parameters:{'n_cluster': 10, 'size_coreset':10000}
  },
  "knn" : {
    fundamental_parameters: {'neighbors':5, 'max_window_size': 5000, 'leaf_size': 30, 'pretrain_size':200}, 
  },
  "denstream" : {
    fundamental_parameters: {'class':10, 'epsilon': 0.05, 'outlier_threshold':0.2},
  },
  "clustream" : {
    fundamental_parameters: {'class':10, 'horizon': 100, 'm':100},
  }
}


class NewProcess extends React.Component {
  /**
   * New process's state
   * Default values are given
   */
  DEFAULT_STATE = {
    current_step: 0,
    selected_dataset: 'kdd99_full_labeled',
    selected_generator: 'sea',
    dataset_parameters: {},
    selected_algorithm: 'hoeffding_tree',
    algorithm_parameters: {...KNOWN_ALGORITHMS['hoeffding_tree'].fundamental_parameters, ...KNOWN_ALGORITHMS['hoeffding_tree'].extra_parameters},
    is_dataset_generated: false,
    errors:[]
  };

  constructor(props) {
    super(props);
    this.state = this.DEFAULT_STATE;
  }

  // -------------- Event Handlers --------------

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

  onDatasetTypeSelected(datasetType){
    if (datasetType==="predefined" || datasetType==="uploaded") // eren: extract to constants
      this.setState({is_dataset_generated: false, dataset_parameters: {}})
    else
      this.setState({is_dataset_generated: true, dataset_parameters: {}})
  }

  handleBack()
  {
    if (this.state.current_step > 0){
        this.setState({current_step: this.state.current_step - 1})
    }
  }

  handleNext()
  {
    if(this.state.current_step ===1){
      this.validate() 
    }    
    if(this.state.current_step === 2){
      this.validateAndRun();
    }
    if(this.state.current_step < 2){
      this.setState({current_step: this.state.current_step + 1})
    }
  }

  handleClose()
  {
    this.setState(this.DEFAULT_STATE)
    this.props.onClose()
  }

  onExit()
  {
    this.setState(this.DEFAULT_STATE)
  }

  validateAndRun(event){
    if(this.validate()){
      this.props.startProcess(this.state.is_dataset_generated,
                              this.state.selected_dataset,
                              this.state.selected_generator,
                              this.state.selected_algorithm,
                              this.state.dataset_parameters,
                              this.state.algorithm_parameters);
    }
    else
      console.log("Invalid Area") // eren: needs to be developed
  }

   // ----------- End of Event Handlers ------------

  render(){
    return (
        <Dialog
            open={this.props.open}
            onExit={this.onExit.bind(this)}
            onClose={this.handleClose.bind(this)}
            fullWidth={true}
            maxWidth='lg'
            aria-labelledby="new-process-dialog-title"
        >
            <DialogTitle id="new-process-dialog-title">Start a new process</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can start a new streaming data analysis process here.
                </DialogContentText>

                <Stepper activeStep={this.state.current_step} alternativeLabel>
                    <Step>
                      <StepLabel>Select a dataset</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Select an algorithm</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Review</StepLabel>
                    </Step>
                </Stepper>
               
                <Divider />
                
                <Container>
                    <br />
                    <Box >
                        {this.state.current_step === 0 && 
                            <Dataset selected_dataset={this.state.selected_dataset} 
                            selected_generator = {this.state.selected_generator}
                            is_dataset_generated = {this.state.is_dataset_generated}
                            parameters={this.state.dataset_parameters}
                            onDatasetChange={this.handleDatasetChange.bind(this)}
                            onParameterChange={this.handleDatasetParameterChange.bind(this)}
                            onGeneratorChange={this.handleGeneratorChange.bind(this)}
                            onDatasetTypeSelected= {this.onDatasetTypeSelected.bind(this)}
                            />
                        }

                        {this.state.current_step === 1 &&
                            <Algorithm selected_algorithm={this.state.selected_algorithm}
                            is_dataset_generated = {this.state.is_dataset_generated}
                            parameters = {this.state.algorithm_parameters}
                            onAlgorithmChange={this.handleAlgorithmChange.bind(this)}
                            onParameterChange={this.handleAlgorithmParameterChange.bind(this)}/>
                        }

                        {this.state.current_step === 2 &&
                             <Review 
                             selected_dataset={this.state.selected_dataset}
                             selected_generator = {this.state.selected_generator}
                             is_dataset_generated = {this.state.is_dataset_generated}
                             selected_algorithm={this.state.selected_algorithm}
                             dataset_parameters={this.state.dataset_parameters}
                             algorithm_parameters = {this.state.algorithm_parameters}
                             errors = {this.state.errors}/>
                        }
                    </Box>
                    <br />
                    <Box>
                        <Button disabled={this.state.current_step === 0} onClick={this.handleBack.bind(this)}>
                            Back
                        </Button>

                        <Button
                            disabled={this.state.current_step === 2 && this.state.errors.length > 0 }
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext.bind(this)}>
                            {this.state.current_step === 2 ? 'Start the Process' : 'Next'}
                        </Button>
                    </Box>
                </Container>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>      
    );
  }

  // -------------------------- Input Validation ----------------------
  validate(){
    let errors = []

    // Checks the dataset parameters
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
    
    
    // Checks the algorithms' parameters
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
    if(this.exists('alg','n_neighbors)')){
      if(this.isLessThanZero('alg','n_neighbors'))
        errors.push('Neighbor Size can not be less than zero')
      if(!this.isInteger('alg','n_neighbors') )
        errors.push('Neighbor Size count must be integer') 
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

    this.setState({errors:errors})
    // if there is any error, prints them
    console.log(errors)
    return errors.length === 0
  }

  /**
   * Checks the parameter existence between in the algorithm or dataset parameters
   * @param {*} context 
   * @param {*} x 
   */
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

  // --------------------- End of Input Validation Methods -------------
}

export default NewProcess;
