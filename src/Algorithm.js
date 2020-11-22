import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';


class Algorithm extends React.Component {

    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom>ALGORITHM</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>Use Predefined Algorithm:
                            <Select labelId="algorithm" id="select" value={this.props.selected_algorithm} onChange={this.props.onAlgorithmChange}>
                                <MenuItem value="hoeffding_tree">Hoeffding Tree </MenuItem>
                                <MenuItem disabled={this.props.is_dataset_generated} value="k_means">K-Means</MenuItem> 
                                <MenuItem disabled={this.props.is_dataset_generated} value="d3">D3</MenuItem>
                                <MenuItem value="knn">Knn</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={1}>
                        &nbsp;
                    </Grid>
                    { this.renderParameters(this.props.selected_algorithm) }
                </Grid>  
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }

    renderParameters(algorithm) {
        if (algorithm === "knn") {
            return this.renderKnnParameters()
        }
        else if (algorithm === "k_means") {
            return this.renderKMeans()
        }
        else if(algorithm === "hoeffding_tree"){
            return this.renderHoeffdingTree()
        }
        else if(algorithm === "d3"){
            return this.renderD3()
        }
        else {
            return "";
        }
    }

    renderKnnParameters() {
        return (
            <Grid container>  
                <Link href="https://scikit-multiflow.github.io/scikit-multiflow/_autosummary/skmultiflow.lazy.KNN.html#skmultiflow.lazy.KNN" target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Neighbors: 
                        <Input type="number" value={this.props.parameters.neighbors} onChange={(e) => this.props.onParameterChange("neighbors", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Maximum Window Size: 
                        <Input type="number" value={this.props.parameters.max_window_size} onChange={(e) => this.props.onParameterChange("max_window_size", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Leaf Size: 
                        <Input type="number" value={this.props.parameters.leaf_size} onChange={(e) => this.props.onParameterChange("leaf_size", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Pretrain Size: 
                        <Input type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("pretrain_size", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    renderKMeans(){
        return (
            <Grid container>
                 <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html" target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Cluster Count: 
                        <Input type="number" value={this.props.parameters.n_cluster} onChange={(e) => this.props.onParameterChange("n_cluster", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary >
                            <Typography>Advanced Parameters</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Maximum Iteration: 
                                <Input type="number" value={this.props.parameters.max_iter} onChange={(e) => this.props.onParameterChange("max_iter", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> N_Init: 
                                <Input type="number" value={this.props.parameters.n_init} onChange={(e) => this.props.onParameterChange("n_init", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        )
    }

    renderHoeffdingTree(){
        return(
        <Grid container> 
            <Link href="https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.classification.trees.hoeffding_tree.html" target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Grace Period: 
                    <Input type="number" value={this.props.parameters.grace_period} onChange={(e) => this.props.onParameterChange("grace_period", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Tie Threshold: 
                    <Input type="number" value={this.props.parameters.tie_threshold} onChange={(e) => this.props.onParameterChange("tie_threshold", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Naive Bayes Threshold: 
                    <Input type="number" value={this.props.parameters.nb_threshold} onChange={(e) => this.props.onParameterChange("nb_threshold", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={4}>
            <   FormControl fullWidth> Leaf Prediction: 
                    <Select labelId="leaf_prediction" value={this.props.parameters.leaf_prediction} onChange={(e) => this.props.onParameterChange("leaf_prediction", e.target.value)}>
                        <MenuItem value="nba">Naive Bayes Adaptive</MenuItem>
                        <MenuItem value="nb">Naive Bayes</MenuItem>
                        <MenuItem value="mc">Majority Class</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={4}>
                <FormControlLabel 
                    control= {<Checkbox color="primary" onChange={(e) => this.props.onParameterChange("remove_poor_atts", e.target.value)} value={this.props.parameters.remove_poor_atts}  />}
                    label = "Remove Poor Attributes" />
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={4}>
                <FormControlLabel
                    control= {<Checkbox color="primary" onChange={(e) => this.props.onParameterChange("no_preprune", e.target.value)} value={this.props.parameters.no_preprune}  />}
                    label = "Disable Preprune"/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControlLabel
                    control={<Checkbox color="primary" onChange={(e) => this.props.onParameterChange("binary_split", e.target.value)} value={this.props.parameters.binary_split}  />}
                    label="Binary Split"/>
            </Grid>
        </Grid>
        )
    }

    renderD3(){
        return (
            <Grid container>  
            <Link href="https://github.com/ogozuacik/d3-discriminative-drift-detector-concept-drift/ " target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Rho: 
                    <Input type="number" value={this.props.parameters.rho} onChange={(e) => this.props.onParameterChange("rho", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary >
                        <Typography>Advanced Parameters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> W: 
                            <Input type="number" value={this.props.parameters.w} onChange={(e) => this.props.onParameterChange("w", e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={1}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Auc: 
                            <Input type="number" value={this.props.parameters.auc} onChange={(e) => this.props.onParameterChange("auc", e.target.value)}/>
                        </FormControl>
                    </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Grid>
        )
    }
   
}

export default Algorithm;