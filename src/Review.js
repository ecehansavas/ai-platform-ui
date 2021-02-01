import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';


class Review extends React.Component {
    constructor(props) {
        super(props);
    }

 
HUMAN_READABLE_ALGORITHM_NAMES = {
    "hoeffding_tree": "Hoeffding Tree",
    "d3": "D3",
    "k_means":"K-Means",
    "streamkm":"Stream KM++",
    "knn":"kNN",
    "clustream":"CluStream",
    "denstream":"DenStream"
  }
  
  HUMAN_READABLE_DATASET_NAMES ={
   "kdd99_full_labeled":"KDD Cup'99",
   "electricity":"Electricity",
   "covtype":"Covertype",
   "stream1":"Synthesised Dataset-1 (Drifted)",
   "stream2":"Synthesised Dataset-2 (Drifted)",
   "stable":"Synthesised Dataset-3 (Stable)",
   "hyperplane":"Hyperplane Generator",
   "sea":"Sea Generator"
  }

    render(){
       
        let datasetVisibility = Object.keys(this.props.dataset_parameters).length>0 ? "visible" : "hidden"
        let errorVisibility = this.props.errors.length > 0 ? "visible" : "hidden"

        return (
            <Box>
                <p>
                    <strong>{this.HUMAN_READABLE_DATASET_NAMES[this.props.selected_dataset]}</strong> dataset will be analyzed with <strong>{this.HUMAN_READABLE_ALGORITHM_NAMES[this.props.selected_algorithm]}</strong> algorithm with the following parameters.
                </p>
                
                <Grid container>
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>

                    <Box width="45%">
                        {this.HUMAN_READABLE_ALGORITHM_NAMES[this.props.selected_algorithm]} Algorithm Parameters
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Parameter Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(this.props.algorithm_parameters).map((param) => (
                                        <TableRow key={param}>
                                            <TableCell>{param}</TableCell>
                                            <TableCell>{this.props.algorithm_parameters[param]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>     

                    <Box width="10%">
                        &nbsp;
                    </Box>         
                                   
                    <Box width="45%" visibility={datasetVisibility}>
                        {this.HUMAN_READABLE_DATASET_NAMES[this.props.selected_dataset]} Dataset Parameters
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Parameter Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(this.props.dataset_parameters).map((param) => (
                                        <TableRow key={param}>
                                            <TableCell>{param}</TableCell>
                                            <TableCell>{this.props.dataset_parameters[param]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                    <Grid item sm={12}>
                        <Divider />
                    </Grid>
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                   
                    <Box width="50%" visibility={errorVisibility}>
                        Invalid Areas
                        <Divider/>
                        {this.props.errors.map(error => (
                            <Typography color="error" key={error}>{error}</Typography>
                        ))}
                    </Box>
                </Grid> 
            </Box>
            
        );
    }

}

export default Review;