import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        if(!this.props.selected_process)
        {
            return null;
        }
       
        var output
        if(this.props.selected_process.algorithm_name=="d3")
        {
            output = this.props.selected_process.results.output
        }
        else if(this.props.selected_process.algorithm_name=="hoeffding_tree")
        {
            output = JSON.stringify(this.props.selected_process.results,null,2)
        }
        else if(this.props.selected_process.algorithm_name=="knn")
        {
            output = JSON.stringify(this.props.selected_process.results,null,2)
        }
        else if(this.props.selected_process.algorithm_name=="k_means") 
        {
            console.log("implement et")
           
        }
        else if(this.props.selected_process.algorithm_name=="denstream")
        {
            output = JSON.stringify(this.props.selected_process.results,null,2)
        }

        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom> Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth> Selected Dataset: {this.props.selected_process.dataset_name} </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth> Selected Algorithm: {this.props.selected_process.algorithm_name}</FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth> 
                            Results:
                            <code style={{whiteSpace: "pre-wrap"}}>{output}</code>
                        </FormControl>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>  
        );
    }
}

export default DetailedView;