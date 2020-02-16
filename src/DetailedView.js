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
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom> Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth> Selected Dataset: {this.props.selected_process.dataset} </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth> Selected Algorithm: {this.props.selected_process.algorithm}</FormControl>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>  
        );
    }
}

export default DetailedView;