import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ReactFileReader from 'react-file-reader';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class Dataset extends React.Component {
    constructor(props) {
        super(props);
    }   

    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom>DATASET</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanel onChange={(e,expanded)=>{this.props.onDatasetTypeSelected("predefined",expanded)}} expanded={!this.props.is_dataset_generated}>
                <ExpansionPanelSummary>
                    <Typography variant="h5">Predefined Dataset</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>Use Predefined Dataset:
                                <Select labelId="dataset" id="select" value={this.props.selected_dataset} onChange={this.props.onDatasetChange}>
                                    <MenuItem value="kdd99">KDD Cup 99</MenuItem>
                                    <MenuItem value="kdd99_raw">KDD Cup 99 (RAW)</MenuItem>
                                    <MenuItem value="pnts_drifted">PNTS DRIFTED</MenuItem>
                                    <MenuItem value="pnts_stable">PNTS STABLE</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Start:
                                <Input type="number" value={this.props.parameters.start_value} onChange={(e) => this.props.onParameterChange("start_value", e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Stop:
                                <Input type="number" value={this.props.parameters.stop_value} onChange={(e) => this.props.onParameterChange("stop_value", e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        
            <ExpansionPanel onChange={(e,expanded)=>{this.props.onDatasetTypeSelected("generated",expanded)}} expanded={this.props.is_dataset_generated}>
                <ExpansionPanelSummary >
                    <Typography variant="h5">Dataset Generator</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>Generator:
                                <Select value={this.props.selected_generator} onChange={this.props.onGeneratorChange}>
                                    <MenuItem value="hyperplane">Hyper Plane Generator</MenuItem>
                                    <MenuItem value="sea">Sea Generator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        { this.renderGenerator(this.props.selected_generator) }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* TODO: Dataset upload olacaksa burayi ac */}
            {/* <ExpansionPanel onChange={(e,expanded)=>{this.props.onDatasetTypeSelected("uploaded",expanded)}} expanded={!this.props.is_dataset_generated}>
                <ExpansionPanelSummary >
                    <Typography variant="h5">Dataset Upload</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                    <Button variant="contained">File Upload</Button>
                                </ReactFileReader>
                            </FormControl>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel> */}
        </ExpansionPanel>
        );
    }

    // Dataset upload kismi. Silme burayi simdilik
    // handleFiles = files => {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //         // Use reader.result
    //         alert(reader.result)
    //     }
    //     reader.readAsText(files[0]);
    // }

    renderGenerator(generator) {
        if (generator === "hyperplane") {
            return this.renderHyperplaneParameters()
        }
        else if (generator === "sea") {
            return this.renderSeaParameters()
        }
        else {
            return "";
        }
    }

    // (random_state=None, n_features=10, n_drift_features=2, mag_change=0.0, noise_percentage=0.05, sigma_percentage=0.1)
    renderHyperplaneParameters(){
        return(
            <Grid container>  
                <Link href="https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.data.generators.hyper_plane_generator.html"  target="_blank">
                    Learn More
                </Link>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Feature Count: 
                        <Input type="number" value={this.props.parameters.n_features} onChange={(e) => this.props.onParameterChange("n_features", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Drifted Feature Count: 
                        <Input type="number" value={this.props.parameters.n_drift_features} onChange={(e) => this.props.onParameterChange("n_drift_features", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Magnitude Change: 
                        <Input type="number" value={this.props.parameters.mag_change} onChange={(e) => this.props.onParameterChange("mag_change", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Noise Percentage: 
                        <Input type="number" value={this.props.parameters.noise_percentage} onChange={(e) => this.props.onParameterChange("noise_percentage", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Sigma Percentage: 
                        <Input type="number" value={this.props.parameters.sigma_percentage} onChange={(e) => this.props.onParameterChange("sigma_percentage", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Sample Size: 
                        <Input type="number" value={this.props.parameters.sample_size} onChange={(e) => this.props.onParameterChange("sample_size", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    // (classification_function=0, random_state=None, balance_classes=False, noise_percentage=0.0)
    renderSeaParameters(){
        return(
            <Grid container>  
            <Link href="https://scikit-multiflow.github.io/scikit-multiflow/skmultiflow.data.generators.sea_generator.html" target="_blank">
                Learn More
            </Link>
            <Grid item sm={12}>
                &nbsp;
            </Grid>
            <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Noise Percentage: 
                        <Input type="number" value={this.props.parameters.noise_percentage} onChange={(e) => this.props.onParameterChange("noise_percentage", e.target.value)}/>
                    </FormControl>
            </Grid>
            <Grid item sm={1}>
                &nbsp;
            </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth> Sample Size: 
                        <Input type="number" value={this.props.parameters.sample_size} onChange={(e) => this.props.onParameterChange("sample_size", e.target.value)}/>
                    </FormControl>
                </Grid>
        </Grid>
        )
    }

}



export default Dataset;