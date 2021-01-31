import React from 'react';
import './App.css';
import ProcessesList from './ProcessesList';
import NewProcess from './NewProcess';
import ProcessDetails from './ProcessDetails'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
        process_list: null,
        selected_process: '',
        loading: false,
        new_process_dialog_open: false,
        details_dialog_open: false        

    }
    this.pollingProcess = null;
  }

  // eren: explain what each function does, why, etc.

  handleShowDetails(id){ 
    let selectedprocess = this.state.process_list.filter((e) =>e.id ===id)
    this.setState({selected_process: selectedprocess[0], details_dialog_open: true})
  }

  handleNewProcessDialog(){
    this.setState({new_process_dialog_open: true})
  }

  handleCloseNewProcessDialog() {
    this.setState({new_process_dialog_open: false})
  }

  handleCloseDetailsDialog(){
    this.setState({details_dialog_open: false})
  }

  handleStartProcess(is_generated_dataset, 
                     selected_dataset, 
                     selected_generator,
                     selected_algorithm,
                     dataset_parameters,
                     algorithm_parameters){
    this.startProcess(is_generated_dataset,
                      selected_dataset,
                      selected_generator,
                      selected_algorithm,
                      dataset_parameters,
                      algorithm_parameters)
        .then(()=>{
          this.handleCloseNewProcessDialog();
        });
  }

  startProcess( is_generated_dataset,
                selected_dataset,
                selected_generator,
                selected_algorithm,
                dataset_parameters,
                algorithm_parameters){
    this.setState({loading: true})
    let new_process = {}
    
    if (is_generated_dataset === false)
      if(selected_dataset === "")
        return // eren: ugly
      else
        new_process.dataset_name = selected_dataset
    else
      new_process.dataset_name = selected_generator
      
    if(selected_algorithm === "")
      return
    
    new_process.algorithm_name = selected_algorithm
    new_process.dataset_parameters = dataset_parameters
    new_process.algorithm_parameters = algorithm_parameters
    
    console.log("backend is " + process.env.REACT_APP_BACKEND_URL)

    return fetch(process.env.REACT_APP_BACKEND_URL + '/api/new_job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_process) ,
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .then((data) => {
      return this.fetchAllJobs()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
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
      return this.fetchAllJobs()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  // eren: run a linter

  render(){
    return (
      <Container>
        <Backdrop style={{zIndex: 999999}} open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <NewProcess 
          open={this.state.new_process_dialog_open}
          onClose={this.handleCloseNewProcessDialog.bind(this)}
          startProcess={this.handleStartProcess.bind(this)}/>   

        <ProcessDetails 
          open={this.state.details_dialog_open}
          onClose={this.handleCloseDetailsDialog.bind(this)}
          selected_process={this.state.selected_process}
          />   

        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            ESTRA 
          </Typography>
        </Box>
        <Divider />
        <Box>
          {this.state.process_list === null && 
            <div>Loading processes...</div>
          }
          {this.state.process_list !== null &&   
            <ProcessesList process_list={this.state.process_list}
              selected_generator = {this.state.selected_generator} 
              showDetails={this.handleShowDetails.bind(this)}
              newProcess={this.handleNewProcessDialog.bind(this)}
              delete = {this.deleteItem.bind(this)}/>
          }
        </Box>
        <br />
        <Divider />
      </Container>
      
    );
  }

  // eren: Organize the file into sections (event handler functions, API interaction functions, etc.)
  startPolling(){
    this.stopPolling();
    this.pollingProcess = setInterval(this.fetchAllJobs.bind(this), 10000);
  }

  stopPolling(){
    clearInterval(this.pollingProcess);
  }

  componentDidMount(){
    this.fetchAllJobs()
    this.startPolling()
  }

  fetchAllJobs(){
    this.stopPolling();
    console.log("backend is " + process.env.REACT_APP_BACKEND_URL)

    return fetch(process.env.REACT_APP_BACKEND_URL + '/api/jobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=> {
      return response.json()
    })
    .then(data => {
      this.setState({process_list: data.jobs})
      if (this.state.selected_process)
      {
        let selectedprocess = data.jobs.filter((e) =>e.id === this.state.selected_process.id)
        if (selectedprocess.length > 0)
          this.setState({selected_process: selectedprocess[0]})
      }
      this.startPolling();
    })
    .catch(e => {
      console.log(e)
      this.starPolling();
    });
  }  
}

export default App;
