import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid, ScatterChart, Scatter } from 'recharts';


class DetailedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {     
            scatter_xaxis: '',
            scatter_yaxis: ''
        }
        
    }
    

    render(){
        if(!this.props.selected_process)
        {
            return null;
        }
       
        var output = JSON.stringify(this.props.selected_process.results,null,2)        

        return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography variant="h4" component="h1" gutterBottom>DETAILS</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div style={{ maxHeight:400, width:'100%', overflow:'auto'}}>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Selected Dataset: {this.props.selected_process.dataset_name} </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Selected Algorithm: {this.props.selected_process.algorithm_name}</FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth> Selected Evaluation: {this.props.selected_process.evaluation}</FormControl>
                        </Grid>
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        {this.renderCharts(this.props.selected_process.algorithm_name) }
                        <Grid item xs={12} sm={12}>
                        Results:<code style={{whiteSpace:"pre-wrap"}}>{output}</code>
                        </Grid>
                    </Grid>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel> 
        );
    }

    renderCharts(algorithm) {
        if (algorithm === "knn") {
            return this.renderKNNParameters()
        }
        else if (algorithm === "samknn") {
            return this.renderSamKNNParameters()
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

    onAxisChanged(axis, value) {
        if (axis == 'x') {
            this.setState({scatter_xaxis: value});
        }
        else {
            this.setState({scatter_yaxis: value});
        }
    }


    renderSamKNNParameters() {
        return (
            <Grid container>  
                <Grid item xs={12} sm={12}>
                    <p>Accuracy-Kappa</p>
                    <LineChart width={800} height={350} data={this.props.selected_process.results}>
                        <XAxis dataKey="id"/>
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_kappa_[M0]" stroke="#ff7300" />
                        <Line type="monotone" dataKey="current_kappa_[M0]" stroke='#38abc8'/>
                        <Line type="monotone" dataKey="mean_acc_[M0]" stroke="#387908" />
                        <Line type="monotone" dataKey="current_acc_[M0]" stroke='#d37f89'/>
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    // TODO: datakeyleri duzelt sonucu aldiginda
    renderKNNParameters(){
        return(
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <ScatterChart width={400} height={400} margin={{ top: 5, right: 20, bottom: 10, left: 5 }}>
                        <XAxis type="number" dataKey={this.state.scatter_xaxis} />
                        <YAxis type="number" dataKey={this.state.scatter_yaxis} />
                        <Tooltip trigger="click" />
                        <Tooltip />
                        <Legend/>
                        <Scatter name="Clusters" data={this.props.selected_process.results} fill="#ff7300" label={{ dataKey: 'cluster'}} />
                    </ScatterChart>
                </Grid>
            </Grid>
        )
    }


    renderKMeans(){
        return (   
            <Grid container> 
                <Grid item xs={12} sm={3}>
                    <p>X-Axis: </p>
                    <Select value={this.state.scatter_xaxis} onChange={(event) => this.onAxisChanged('x', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem value={item}>{item} </MenuItem>)
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <p>Y-Axis: </p>
                    <Select value={this.state.scatter_yaxis} onChange={(event) => this.onAxisChanged('y', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem value={item}>{item} </MenuItem>)
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ScatterChart width={400} height={400} margin={{ top: 5, right: 20, bottom: 10, left: 5 }}>
                        <XAxis type="number" dataKey={this.state.scatter_xaxis} />
                        <YAxis type="number" dataKey={this.state.scatter_yaxis} />
                        <Tooltip trigger="click" />
                        <Tooltip />
                        <Legend/>
                        <Scatter name="Clusters" data={this.props.selected_process.results} fill="#ff7300" label={{ dataKey: 'cluster'}} />
                    </ScatterChart>
                </Grid>
            </Grid> 
        )
    }

    renderHoeffdingTree(){
        return(
            <Grid container> 
                <Grid item xs={12} sm={6}>
                    <p>True vs. Expected Value</p>
                    <LineChart width={500} height={350} data={this.props.selected_process.results} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="true_value" stroke="#ff7300" />
                        <Line type="monotone" dataKey="predicted_value_[M0]" stroke="#38abc8" />
                    </LineChart>
                </Grid>
                <Grid item xs={12} sm={6}>
                <p>Accuracy</p>
                    <LineChart width={500} height={350} data={this.props.selected_process.results} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis dataKey="datacount" label="Data Count"/>
                        <YAxis  />
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_acc_[M0]" stroke="#ff7300" />
                        <Line type="monotone" dataKey="current_acc_[M0]" stroke="#38abc8" />
                    </LineChart>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={12}>
                <p>Kappa</p>
                    <LineChart width={1000} height={350} data={this.props.selected_process.results} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis label="Data Count"/>
                        <YAxis  />
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_kappa_[M0]" stroke="#ff7300" />
                        <Line type="monotone" dataKey="current_kappa_[M0]" stroke='#38abc8'/>
                        <Line type="monotone" dataKey="mean_kappa_m_[M0]" stroke="#387908" />
                        <Line type="monotone" dataKey="current_kappa_m_[M0]" stroke='#d37f89'/>
                        <Line type="monotone" dataKey="mean_kappa_t_[M0]" stroke="#1b6a73" />
                        <Line type="monotone" dataKey="current_kappa_t_[M0]" stroke='#960018'/>
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    renderDenstream(){
        return(
           "denstream"
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
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.results}>
                        <XAxis dataKey="data_percentage" label="Data Percentage"/>
                        <YAxis dataKey="acc" label="Accuracy"/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="acc" stroke="#ff7300" />
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    renderHalfSpaceTree(){
        return(
          "halfspace"
        )
    }

}

export default DetailedView;