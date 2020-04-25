import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
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
                    <Grid item xs={12} sm={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary >
                            <Typography>Advanced  Parameters</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Pretrain Size: 
                                <Input type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("pretrain_size", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Maximum Sample: 
                                <Input type="number" value={this.props.parameters.max_sample} onChange={(e) => this.props.onParameterChange("max_sample", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Batch Size: 
                                <Input type="number" value={this.props.parameters.batch_size} onChange={(e) => this.props.onParameterChange("batch_size", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> n_wait: 
                                <Input type="number" value={this.props.parameters.n_wait} onChange={(e) => this.props.onParameterChange("n_wait", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
             </Grid>   
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }
}

export default Evaluation;