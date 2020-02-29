import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class Algorithm extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom> Algorithm</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>Use Predefined Algorithm:
                            <Select labelId="algorithm" id="select" value={this.props.selected_algorithm} onChange={this.props.onAlgorithmChange}>
                                <MenuItem value="hoeffding_tree">Hoeffding Tree </MenuItem>
                                <MenuItem value="k_means">K-Means</MenuItem>
                                <MenuItem value="knn">knn</MenuItem>
                                <MenuItem value="d3">D3</MenuItem>
                                <MenuItem value="denstream">DenStream</MenuItem>
                                <MenuItem value="clustream">CluStream</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={1}>
                        &nbsp;
                    </Grid>
                    { this.renderParameters(this.props.selected_algorithm) }
            {/* <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="description">Description of {this.props.selected_algorithm}</InputLabel>
                        <Input id="description"/>
                    </FormControl>
                </Grid> */}   
                </Grid>  
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }

    renderParameters(algorithm) {
        if (algorithm == "knn") {
            return this.renderKNNParameters()
        }
        else if (algorithm == "k_means") {
            return this.renderKMeans()
        }
        else if(algorithm == "hoeffding_tree"){
            return this.renderHoeffdingTree()
        }
        else if(algorithm == "denstream"){
            return this.renderDenstream()
        }
        else if(algorithm == "clustream"){
            return this.renderClustream()
        }
        else if(algorithm == "d3"){
            return this.renderD3()
        }
        else {
            return "";
        }
    }

    renderKNNParameters() {
        return (
            <Grid container>  
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Neighbors: 
                        <Input type="number" value={this.props.parameters.neighbors} onChange={(e) => this.props.onParameterChange("neighbors", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Pretrain Size: 
                        <Input type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("neighbors", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    renderKMeans(){
        return (
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Cluster Count: 
                        <Input type="number" value={this.props.parameters.n_cluster} onChange={(e) => this.props.onParameterChange("n_cluster", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
            </Grid>
        )
    }

    renderHoeffdingTree(){
        return(
        <Grid container>  
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Pretrain Size: 
                    <Input type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("neighbors", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
        </Grid>
        )
    }

    renderDenstream(){
        return(
            <Grid container>  
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Epsilon: 
                        <Input type="number" value={this.props.parameters.epsilon} onChange={(e) => this.props.onParameterChange("epsilon", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Lambda: 
                        <Input type="number" value={this.props.parameters.lambda} onChange={(e) => this.props.onParameterChange("lambda", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Beta: 
                        <Input type="number" value={this.props.parameters.beta} onChange={(e) => this.props.onParameterChange("beta", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Mu: 
                        <Input type="number" value={this.props.parameters.mu} onChange={(e) => this.props.onParameterChange("mu", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    renderClustream(){
        return(
            "clustream"
        )
    }

    renderD3(){
        return (
            <Grid container>  
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Rho: 
                    <Input type="number" value={this.props.parameters.rho} onChange={(e) => this.props.onParameterChange("rho", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
        </Grid>
        )
    }

    
}

export default Algorithm;