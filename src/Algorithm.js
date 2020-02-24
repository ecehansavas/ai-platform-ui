import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
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
}

export default Algorithm;