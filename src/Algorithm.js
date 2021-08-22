import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';


class Algorithm extends React.Component {

    /**
     * Shows the available algorithms
     */
    render(){
        return (
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>Algorithm:
                        <Select labelId="algorithm" id="select" value={this.props.selected_algorithm} onChange={this.props.onAlgorithmChange}>
                            <MenuItem value="hoeffding_tree">Hoeffding Tree</MenuItem>
                            <MenuItem disabled={this.props.is_dataset_generated} value="k_means">K-Means</MenuItem> 
                            <MenuItem value="streamkm">Stream KM++</MenuItem> 
                            <MenuItem disabled={this.props.is_dataset_generated} value="d3">D3</MenuItem>
                            <MenuItem value="knn">kNN</MenuItem>
                            <MenuItem value="clustream">CluStream</MenuItem>
                            <MenuItem value="denstream">DenStream</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                { this.renderParameters(this.props.selected_algorithm) }
            </Grid>  
        );
    }

    /**
     * Renders the selected algorithm
     * @param {*} algorithm 
     */
    renderParameters(algorithm) {
        if (algorithm === "knn") {
            return this.renderKnnParameters()
        }
        else if (algorithm === "k_means") {
            return this.renderKMeans()
        }
        else if(algorithm === "streamkm"){
            return this.renderStreamKM()
        }
        else if(algorithm === "hoeffding_tree"){
            return this.renderHoeffdingTree()
        }
        else if(algorithm === "d3"){
            return this.renderD3()
        }
        else if(algorithm === "denstream"){
            return this.renderDenstream()
        }
        else if(algorithm === "clustream"){
            return this.renderClustream()
        }
        else {
            return "";
        }
    }

    /**
     * Shows the knn algorithm parameters
     */
    renderKnnParameters() {
        return (
            <Grid container>  
                <Link href="https://scikit-multiflow.github.io/scikit-multiflow/_autosummary/skmultiflow.lazy.KNN.html#skmultiflow.lazy.KNN" target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item sm={12}>
                    <Divider />
                </Grid >
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                    Fill the following parameters...
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Neighbors: 
                        <Input type="number" value={this.props.parameters.neighbors} onChange={(e) => this.props.onParameterChange("neighbors", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Maximum Window Size: 
                        <Input type="number" value={this.props.parameters.max_window_size} onChange={(e) => this.props.onParameterChange("max_window_size", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Leaf Size: 
                        <Input type="number" value={this.props.parameters.leaf_size} onChange={(e) => this.props.onParameterChange("leaf_size", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Pretrain Size: 
                        <Input type="number" value={this.props.parameters.pretrain_size} onChange={(e) => this.props.onParameterChange("pretrain_size", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    /**
     * Shows the k-means available parameters
     */
    renderKMeans(){
        return (
            <Grid container>
                 <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html" target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item sm={12}>
                    <Divider />
                </Grid >
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                    Fill the following parameters...
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Cluster Count: 
                        <Input type="number" value={this.props.parameters.n_cluster} onChange={(e) => this.props.onParameterChange("n_cluster", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Maximum Iteration #: 
                        <Input type="number" value={this.props.parameters.max_iter} onChange={(e) => this.props.onParameterChange("max_iter", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Different Centroid Seeds #: 
                        <Input type="number" value={this.props.parameters.n_init} onChange={(e) => this.props.onParameterChange("n_init", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    /**
     * Shows the streamKm parameters
     */
    renderStreamKM(){
        return (
            <Grid container>
                 <Link href="https://rdrr.io/cran/streamMOA/man/DSC_streamkm.html" target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item sm={12}>
                    <Divider />
                </Grid >
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                    Fill the following parameters...
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Cluster Count: 
                        <Input type="number" value={this.props.parameters.n_cluster} onChange={(e) => this.props.onParameterChange("n_cluster", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Size Coreset: 
                        <Input type="number" value={this.props.parameters.size_coreset} onChange={(e) => this.props.onParameterChange("size_coreset", e.target.value)}/>
                    </FormControl>
                </Grid>  
            </Grid>
        )
    }

    /**
     * Shows the hoeffding tree parameters
     */
    renderHoeffdingTree(){
        return(
        <Grid container> 
            <Link href="https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.classification.trees.hoeffding_tree.html" target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item sm={12}>
                <Divider />
            </Grid >
            <Grid item sm={12}>
                &nbsp;
            </Grid>
                Fill the following parameters...
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Grace Period: 
                    <Input type="number" value={this.props.parameters.grace_period} onChange={(e) => this.props.onParameterChange("grace_period", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Tie Threshold: 
                    <Input type="number" value={this.props.parameters.tie_threshold} onChange={(e) => this.props.onParameterChange("tie_threshold", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Naive Bayes Threshold: 
                    <Input type="number" value={this.props.parameters.nb_threshold} onChange={(e) => this.props.onParameterChange("nb_threshold", e.target.value)}/>
                </FormControl>
            </Grid>
        </Grid>
        )
    }

    /**
     * Represents the d3 parameters
     */
    renderD3(){
        return (
            <Grid container>  
            <Link href="https://github.com/ogozuacik/d3-discriminative-drift-detector-concept-drift/ " target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item sm={12}>
                <Divider />
            </Grid >
            <Grid item sm={12}>
                &nbsp;
            </Grid>
                Fill the following parameters...
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Rho: 
                    <Input type="number" value={this.props.parameters.rho} onChange={(e) => this.props.onParameterChange("rho", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid> 
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> W: 
                    <Input type="number" value={this.props.parameters.w} onChange={(e) => this.props.onParameterChange("w", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Auc: 
                    <Input type="number" value={this.props.parameters.auc} onChange={(e) => this.props.onParameterChange("auc", e.target.value)}/>
                </FormControl>
            </Grid>
        </Grid>
        )
    }

    /**
     * Shows the clustream parameters
     */
    renderClustream(){
        return (
            <Grid container>  
            <Link href="https://rdrr.io/cran/streamMOA/man/DSC_CluStream.html" target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item sm={12}>
                <Divider />
            </Grid >
            <Grid item sm={12}>
                &nbsp;
            </Grid>
                Fill the following parameters...
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> k: 
                    <Input type="number" value={this.props.parameters.class} onChange={(e) => this.props.onParameterChange("class", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Horizon: 
                    <Input type="number" value={this.props.parameters.horizon} onChange={(e) => this.props.onParameterChange("horizon", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> m: 
                    <Input type="number" value={this.props.parameters.m} onChange={(e) => this.props.onParameterChange("m", e.target.value)}/>
                </FormControl>
            </Grid>
        </Grid>
        )
    }

    /**
     * Represents the denstream parameters
     */
    renderDenstream(){
        return (
            <Grid container>  
            <Link href="https://rdrr.io/cran/streamMOA/man/DSC_DenStream.html" target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item sm={12}>
                <Divider />
            </Grid >
            <Grid item sm={12}>
                &nbsp;
            </Grid>
                Fill the following parameters...
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> k: 
                    <Input type="number" value={this.props.parameters.class} onChange={(e) => this.props.onParameterChange("class", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth> Epsilon: 
                    <Input type="number" value={this.props.parameters.epsilon} onChange={(e) => this.props.onParameterChange("epsilon", e.target.value)}/>
                </FormControl>
            </Grid>
            <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Outlier Threshold: 
                        <Input type="number" value={this.props.parameters.outlier_threshold} onChange={(e) => this.props.onParameterChange("outlier_threshold", e.target.value)}/>
                    </FormControl>
                </Grid>
        </Grid>
        )
    }
   
}

export default Algorithm;