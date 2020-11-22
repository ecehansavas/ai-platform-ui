import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class Evaluation extends React.Component {


    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom>EVALUATION</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container >
                    { !this.props.enabled &&
                        <Typography color="primary" variant="h6" component="h1" gutterBottom>This property is not applicaple for the selected algorithm</Typography>
                    }
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>Evaluation Type:
                            <Select disabled={!this.props.enabled} labelId="algorithm" id="select" value={this.props.selected_evaluation} onChange={this.props.onEvaluationChange}>
                                <MenuItem value="prequential">Prequential</MenuItem>
                                <MenuItem value="holdout">Holdout</MenuItem>
                                <MenuItem value="basic">Basic</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                    <Link href="https://scikit-multiflow.github.io/scikit-multiflow/documentation.html#module-skmultiflow.evaluation" target="_blank">
                        Learn More
                    </Link>
                    <Grid item sm={12}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary >
                            <Typography variant="h5">Advanced  Parameters</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Maximum Sample: 
                                <Input disabled={!this.props.enabled} type="number" value={this.props.parameters.max_sample} onChange={(e) => this.props.onParameterChange("max_sample", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Batch Size: 
                                <Input disabled={!this.props.enabled} type="number" value={this.props.parameters.batch_size} onChange={(e) => this.props.onParameterChange("batch_size", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> n_wait: 
                                <Input disabled={!this.props.enabled} type="number" value={this.props.parameters.n_wait} onChange={(e) => this.props.onParameterChange("n_wait", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        { this.renderEvaluation(this.props.selected_evaluation) }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
             </Grid>   
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }

    renderEvaluation(evaluation) {
        if(evaluation==="prequential"){
            return this.renderPretrain() ;
        }
        // eren: else?
    }

    renderPretrain() {
        return (
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Pretrain Size: 
                    <Input disabled={!this.props.enabled} type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("pretrain_size", e.target.value)}/>
                </FormControl>
            </Grid>
        )
    }

}

export default Evaluation;