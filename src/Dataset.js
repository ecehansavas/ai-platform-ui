import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class Dataset extends React.Component {
    constructor(props) {
        super(props);
    }   

    render(){
        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom>Dataset</Typography>
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
                    {/* <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="description">Description of {this.props.selected_dataset}</InputLabel>
                            <Input id="description"/>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Stream Period: 
                            <Input type="number" value={this.props.stream_period} onChange={(e) => this.props.onParameterChange("stream_period", e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Window Length: 
                            <Input type="number" value={this.props.window_length} onChange={(e) => this.props.onParameterChange("window_length", e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item sm={1}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Start:
                            <Input type="number" value={this.props.start_value} onChange={(e) => this.props.onParameterChange("start_value", e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Stop:
                            <Input type="number" value={this.props.stop_value} onChange={(e) => this.props.onParameterChange("stop_value", e.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid item sm={1}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth> Repeat Count for Each Instance:
                            <Input type="number" value={this.props.repeat_count} onChange={(e) => this.props.onParameterChange("repeat_count", e.target.value)} />
                        </FormControl>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }
}

export default Dataset;