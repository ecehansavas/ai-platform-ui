import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';


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
   "stable":"Synthesised Dataset--3 (Stable)",
   "hyperplane":"Hyperplane Generator",
   "sea":"Sea Generator"
  }

    render(){
        // eren: Gorsel iyilestir + errorler
        return (
            <Grid container>
                <Grid container item xs={12} sm={12}>
                    {this.HUMAN_READABLE_DATASET_NAMES[this.props.selected_dataset]} dataset is run with {this.HUMAN_READABLE_ALGORITHM_NAMES[this.props.selected_algorithm]} algorithm.
                </Grid>
                
                <Grid container item xs={12} sm={12}>
                    Dataset Parameters: {Object.keys(this.props.dataset_parameters).map((param) => <div key={param}> {param}:{this.props.dataset_parameters[param]} </div>)} 
                </Grid>

                <Grid container item xs={12} sm={12}>
                    Algorithm Parameters: {Object.keys(this.props.algorithm_parameters).map((param) => <div key={param}>{param}:{this.props.algorithm_parameters[param]} </div>)} 
                </Grid>


                <Grid container item xs={12} sm={12}>
                    Invalid Areas: {Object.keys(this.props.errors).map((param) => <div key={param}>{param}:{this.props.errors[param]} </div>)} 
                </Grid>
            </Grid> 
        );
    }

}

export default Review;