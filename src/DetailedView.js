import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
                        <Grid container spacing={5}>
                            <Grid item sm={12}>
                                <Typography variant="h5" gutterBottom>Data Summary</Typography>
                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                            &nbsp;
                        </Grid>
                        {this.renderTableData(this.props.selected_process.data_summary)}       
                        <Grid item sm={1}>
                            &nbsp;
                        </Grid>
                        {this.renderCharts(this.props.selected_process.algorithm_name) }
                    </Grid>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="h5" gutterBottom>Results</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{ maxHeight:400, width:'100%', overflow:'auto'}}>
                                <code style={{whiteSpace:"pre-wrap"}}>{output}</code>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel> 
        );
    }

    renderTableData(data){
        const header = {feature: 'Feature',
                        min: 'Minimum',
                        max: 'Maximum',
                        std: 'Standard Deviation',
                        mean: 'Mean',
                        first_quarter:'First Quarter',
                        second_quarter:'Second Quarter (Median)',
                        third_quarter: 'Third Quarter',
                        count:'Count'
                        }

        return (
            <TableContainer style={{maxHeight:400}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{header.feature}</TableCell>
                        <TableCell>{header.min}</TableCell>
                        <TableCell>{header.max}</TableCell>
                        <TableCell>{header.std}</TableCell>
                        <TableCell>{header.mean}</TableCell>
                        <TableCell>{header.first_quarter}</TableCell>
                        <TableCell>{header.second_quarter}</TableCell>
                        <TableCell>{header.third_quarter}</TableCell>
                        <TableCell>{header.count}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.keys(data).map((item,index)=>{                    
                    let value = data[item]
                    return (
                    <TableRow key={item}>
                        <TableCell>{item}</TableCell>
                        <TableCell>{value['min']}</TableCell>
                        <TableCell>{value['max']}</TableCell>
                        <TableCell>{value['std']}</TableCell>
                        <TableCell>{value['mean']}</TableCell>
                        <TableCell>{value['25%']}</TableCell>
                        <TableCell>{value['50%']}</TableCell>
                        <TableCell>{value['75%']}</TableCell>
                        <TableCell>{value['count']}</TableCell>
                    </TableRow>
                    )
                })}
                </TableBody>
            </Table>                    
        </TableContainer>
        )
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
        if (axis === 'x') {
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

    renderKNNParameters(){
        let dataByClass = {};
        for(let i = 0; i < this.props.selected_process.results.length; i++)
        {
            let item = this.props.selected_process.results[i];
            if (!dataByClass[item["found_label"]])
            {
                dataByClass[item["found_label"]] = [];
            }
            dataByClass[item["found_label"]].push(item)
        }

        return(
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <p>X-Axis: </p>
                    <Select value={this.state.scatter_xaxis} onChange={(event) => this.onAxisChanged('x', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem key={"x" + item} value={item}>{item} </MenuItem>)
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <p>Y-Axis: </p>
                    <Select value={this.state.scatter_yaxis} onChange={(event) => this.onAxisChanged('y', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem key={"y" + item} value={item}>{item} </MenuItem>)
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
                        {
                            Object.keys(dataByClass).map((label,index)=>{
                                let randomColor = this.getRandomColor();
                                return( <Scatter name={"Class-"+label} data={dataByClass[label]} fill={randomColor} label={{ dataKey: 'class'}} />)
                            })
                        }
                    </ScatterChart>
                </Grid>
            </Grid>
        )
    }


    renderKMeans(){
        let dataByClass = {};
        for(let i = 0; i < this.props.selected_process.results.length; i++)
        {
            let item = this.props.selected_process.results[i];
            if (!dataByClass[item["cluster"]])
            {
                dataByClass[item["cluster"]] = [];
            }
            dataByClass[item["cluster"]].push(item)
        }

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
                        {
                            Object.keys(dataByClass).map((label,index)=>{
                                let randomColor = this.getRandomColor();
                                return( <Scatter name={"Cluster-" + label} data={dataByClass[label]} fill={randomColor} label={{ dataKey: 'cluster'}} />)
                            })}
                        }
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

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

export default DetailedView;