import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

class Dataset extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTabChange(event, newValue){
        let selectedDatasetType = newValue === 1 ? "generated" : "predefined"
        this.props.onDatasetTypeSelected(selectedDatasetType)
    }


    render(){
        let currentTabIndex = this.props.is_dataset_generated ? 1 : 0
        return (
            <Container>
                <Tabs value={currentTabIndex} onChange={this.handleTabChange.bind(this)} aria-label="wrapped label tabs example">
                    <Tab label="Predefined Dataset" id="tab-0" aria-controls="tabpanel-0" />
                    <Tab label="Dataset Generator" id="tab-1" aria-controls="tabpanel-1"/>
                </Tabs>
               
                {currentTabIndex === 0 && this.renderPredefinedDatasetPanel()}
                {currentTabIndex === 1 && this.renderGeneratorPanel()}
               
            </Container>     
        );
    }


    renderPredefinedDatasetPanel(){
        return (
            <Grid container >
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>Dataset:
                        <Select labelId="dataset" id="select" value={this.props.selected_dataset} onChange={this.props.onDatasetChange}>
                            <MenuItem value="kdd99_full_labeled">KDD Cup'99</MenuItem>
                            <MenuItem value="electricity">Electricity</MenuItem>
                            <MenuItem value="covtype">Covertype</MenuItem>
                            <MenuItem value="stream1">Synthesised Dataset-1 (Drifted)</MenuItem>
                            <MenuItem value="stream2">Synthesised Dataset-2 (Drifted)</MenuItem>
                            <MenuItem value="stable">Synthesised Dataset-3 (Stable)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }

   
    renderGeneratorPanel(){
        return (           
            <Grid container>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>Generator:
                        <Select value={this.props.selected_generator} onChange={this.props.onGeneratorChange}>
                            <MenuItem value="hyperplane">Hyperplane Generator</MenuItem>
                            <MenuItem value="sea">Sea Generator</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                { this.renderGenerator(this.props.selected_generator) }
            </Grid>
        );
    }

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
                <Link href="https://scikit-multiflow.readthedocs.io/en/stable/api/generated/skmultiflow.data.HyperplaneGenerator.html#skmultiflow.data.HyperplaneGenerator"  target="_blank">
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
                Fill the following data generator parameters...
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Feature Count: 
                        <Input type="number" value={this.props.parameters.n_features} onChange={(e) => this.props.onParameterChange("n_features", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={2}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Drifted Feature Count: 
                        <Input type="number" value={this.props.parameters.n_drift_features} onChange={(e) => this.props.onParameterChange("n_drift_features", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={2}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Magnitude Change: 
                        <Input type="number" value={this.props.parameters.mag_change} onChange={(e) => this.props.onParameterChange("mag_change", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Noise Percentage: 
                        <Input type="number" value={this.props.parameters.noise_percentage} onChange={(e) => this.props.onParameterChange("noise_percentage", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={2}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Sigma Percentage: 
                        <Input type="number" value={this.props.parameters.sigma_percentage} onChange={(e) => this.props.onParameterChange("sigma_percentage", e.target.value)}/>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }

    // (classification_function=0, random_state=None, balance_classes=False, noise_percentage=0.0)
    renderSeaParameters(){
        return(
            <Grid container>  
                <Link href="https://scikit-multiflow.readthedocs.io/en/stable/api/generated/skmultiflow.data.SEAGenerator.html#skmultiflow.data.SEAGenerator" target="_blank">
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
                Fill the following data generator parameters...
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth> Noise Percentage: 
                        <Input type="number" value={this.props.parameters.noise_percentage} onChange={(e) => this.props.onParameterChange("noise_percentage", e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item sm={2}>
                    &nbsp;
                </Grid>
            </Grid>
        )
    }

}

export default Dataset;