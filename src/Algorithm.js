import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';


class Algorithm extends React.Component {
    constructor(props) {
        super(props);
        
    }

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
                                <MenuItem value="k_means">K-Means</MenuItem>
                                <MenuItem value="d3">D3</MenuItem>
                                <MenuItem value="knn">Knn</MenuItem>
                                <MenuItem value="samknn">SAM Knn</MenuItem>
                                <MenuItem value="denstream">DenStream-Calismiyor</MenuItem>
                                <MenuItem value="clustream">CluStream-Calismiyor</MenuItem>
                                <MenuItem value="half_space_tree">Half Space Trees-Sonuclarini alamadik</MenuItem>
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
        if (algorithm === "samknn") {
            return this.renderSamKNNParameters()
        }
        else if (algorithm === "knn") {
            return this.renderKnnParameters()
        }
        else if (algorithm === "k_means") {
            return this.renderKMeans()
        }
        else if(algorithm === "hoeffding_tree"){
            return this.renderHoeffdingTree()
        }
        else if(algorithm === "denstream"){
            return this.renderDenstream()
        }
        else if(algorithm === "clustream"){
            return this.renderClustream()
        }
        else if(algorithm === "d3"){
            return this.renderD3()
        }
        else if(algorithm === "half_space_tree"){
            return this.renderHalfSpaceTree()
        }
        else {
            return "";
        }
    }

    renderSamKNNParameters() {
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
                    <FormControl fullWidth> Maximum Window Size: 
                        <Input type="number" value={this.props.parameters.max_window_size} onChange={(e) => this.props.onParameterChange("max_window_size", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }


    renderKnnParameters() {
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
                <FormControl fullWidth> Remove Poor Attributes: 
                    <Checkbox color="primary" onChange={(e) => this.props.onParameterChange("remove_poor_atts", e.target.value)} value={this.props.parameters.remove_poor_atts}  />
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Disable Preprune: 
                    <Checkbox color="primary" onChange={(e) => this.props.onParameterChange("no_preprune", e.target.value)} value={this.props.parameters.no_preprune}  />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth> Binary Split: 
                    <Checkbox color="primary" onChange={(e) => this.props.onParameterChange("binary_split", e.target.value)} value={this.props.parameters.binary_split}  />
                </FormControl>
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

    renderHalfSpaceTree(){
        return(
            <Grid container>  
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Feature Size: 
                        <Input type="number" value={this.props.parameters.n_features} onChange={(e) => this.props.onParameterChange("n_features", e.target.value)}/>
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
                            <FormControl fullWidth> Estimator Size: 
                                <Input type="number" value={this.props.parameters.n_estimators} onChange={(e) => this.props.onParameterChange("n_estimators", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Window Size: 
                                <Input type="number" value={this.props.parameters.window_size} onChange={(e) => this.props.onParameterChange("window_size", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Depth: 
                                <Input type="number" value={this.props.parameters.depth} onChange={(e) => this.props.onParameterChange("depth", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Size Limit: 
                                <Input type="number" value={this.props.parameters.size_limit} onChange={(e) => this.props.onParameterChange("size_limit", e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Anomaly Threshold: 
                                <Input type="number" value={this.props.parameters.anomaly_threshold} onChange={(e) => this.props.onParameterChange("anomaly_threshold", e.target.value)}/>
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