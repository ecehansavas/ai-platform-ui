import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class Evaluation extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom> Evaluation</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container >
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>Evaluation Type:
                            <Select labelId="algorithm" id="select" value={this.props.selected_evaluation} onChange={this.props.onEvaluationChange}>
                                <MenuItem value="prequential">Prequential</MenuItem>
                                <MenuItem value="holdout">Holdout</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>   
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }
}

export default Evaluation;