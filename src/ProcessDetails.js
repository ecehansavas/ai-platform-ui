import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid, ScatterChart, Scatter, BarChart, Bar, ResponsiveContainer } from 'recharts';


class ProcessDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {     
            scatter_xaxis: '',
            scatter_yaxis: '',
            current_tab: 0
        }
  }


    HUMAN_READABLE_ALGORITHM_NAMES = {
        "hoeffding_tree": "Hoeffding Tree",
        "d3": "D3",
        "k_means":"K-Means",
        "streamkm":"Stream KM++",
        "knn":"kNN",
        "clustream":"CluStream",
        "denstream":"DenStream"
    }
  
    HUMAN_READABLE_DATASET_NAMES ={
        "kdd99_full_labeled":"KDD Cup'99",
        "electricity":"Electricity",
        "covtype":"Covertype",
        "stream1":"Synthesised Dataset-1 (Drifted)",
        "stream2":"Synthesised Dataset-2 (Drifted)",
        "stable":"Synthesised Dataset-3 (Stable)",
        "hyperplane":"Hyperplane Generator",
        "sea":"Sea Generator"
    }

  handleTabChange(event, newValue){
    this.setState({current_tab: newValue});
    console.log(newValue)
  }

    render(){
        if(!this.props.selected_process)
        {
            return null;
        }
        
        return (
            
            <Dialog open={this.props.open}
                    onClose={this.props.onClose}
                    fullWidth={true}
                    maxWidth='lg'
                    aria-labelledby="details-dialog-title" >

                <DialogTitle id="details-dialog-title">See the details of the process</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can see the {this.HUMAN_READABLE_DATASET_NAMES[this.props.selected_process.dataset_name]} dataset analysis results on {this.HUMAN_READABLE_ALGORITHM_NAMES[this.props.selected_process.algorithm_name]} algorithm.
                        </DialogContentText>

                        <Container>
                            <Tabs value={this.state.current_tab} onChange={this.handleTabChange.bind(this)} aria-label="wrapped label tabs example">
                                <Tab label="Data Summary" id="tab-0" aria-controls="tabpanel-0" />
                                <Tab label="Graphs" id="tab-1" aria-controls="tabpanel-1"/>
                                <Tab label="Raw Results" id="tab-2" aria-controls="tabpanel-2"/>
                            </Tabs>

                            {this.state.current_tab === 0 && this.renderDataSummaryTable()}

                            {this.state.current_tab === 1 && this.renderCharts()}

                            {this.state.current_tab === 2 && this.renderRawData()}

                        </Container>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.onClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>      
        );
  }


    renderDataSummaryTable(){
        let data = this.props.selected_process.data_summary;
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

        if (Object.keys(data).length === 0){
            return
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
                            <TableCell>{value['min'].toFixed(2)}</TableCell>
                            <TableCell>{value['max'].toFixed(2)}</TableCell>
                            <TableCell>{value['std'].toFixed(2)}</TableCell>
                            <TableCell>{value['mean'].toFixed(2)}</TableCell>
                            <TableCell>{value['25%'].toFixed(2)}</TableCell>
                            <TableCell>{value['50%'].toFixed(2)}</TableCell>
                            <TableCell>{value['75%'].toFixed(2)}</TableCell>
                            <TableCell>{value['count']}</TableCell>
                        </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>                    
            </TableContainer>
        )
    } 

    renderRawData()
    {
        return (
            <Grid container>                    
                <div style={{ maxHeight:400, width:'100%', overflow:'auto'}}>
                    <code style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(this.props.selected_process.results,null,2) }</code>
                </div>
            </Grid>
        )      
    }

    renderCharts() {
        let algorithm = this.props.selected_process.algorithm_name;
        if (algorithm === "knn") {
            return this.renderKNNCharts()
        }
        else if (algorithm === "k_means") {
            return this.renderKMeansCharts()
        }
        else if (algorithm === "streamkm") {
            return this.renderStreamKMCharts()
        }
        else if(algorithm === "hoeffding_tree"){
            return this.renderHoeffdingTreeStreamCharts()
        } 
        else if(algorithm === "d3"){
            return this.renderD3Charts()
        }
        else if(algorithm === "denstream"){
            return this.renderDenstreamCharts()
        }
        else if(algorithm === "clustream"){
            return this.renderClustreamCharts()
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


    renderKNNCharts(){
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

        if(!this.props.selected_process.finished_at){ // Knn immediate results
            return(
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <p>Progress</p>
                        <LineChart width={700} height={350} data={this.props.selected_process.progress.progress} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                        </LineChart>
                    </Grid>
                </Grid>
            )
        }else{ 
            return(
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <p>Progress</p>
                        <LineChart width={700} height={350} data={this.props.selected_process.progress.progress} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                        </LineChart>
                    </Grid>
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
    }


    renderKMeansCharts(){
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


        let histogram = Object.keys(dataByClass).map((cls) => {return {"name": cls, "Count": dataByClass[cls].length}});
    
        return (   
            <Grid container> 
                <Grid container spacing={5}>
                    <Grid item sm={12}>
                    <Divider />
                        <Typography variant="h5" gutterBottom>Data Clusters</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={3}>
                    <p>X-Axis: </p>
                    <Select value={this.state.scatter_xaxis} onChange={(event) => this.onAxisChanged('x', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem key={"key-"+item} value={item}>{item} </MenuItem>)
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <p>Y-Axis: </p>
                    <Select value={this.state.scatter_yaxis} onChange={(event) => this.onAxisChanged('y', event.target.value)}  >
                        {Object.keys(this.props.selected_process.results[0]).map((item,index)=>{
                            return( <MenuItem key={"key-"+item} value={item}>{item} </MenuItem>)
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ScatterChart width={400} height={400} margin={{ top: 5, right: 20, bottom: 10, left: 5 }}>
                        <XAxis type="number" dataKey={this.state.scatter_xaxis} />
                        <YAxis type="number" dataKey={this.state.scatter_yaxis} />
                        <Tooltip />
                        <Legend/>
                        {
                            Object.keys(dataByClass).map((label,index)=>{
                                let randomColor = this.getRandomColor();
                                return( <Scatter key={"key-"+label} name={"Cluster-" + label} data={dataByClass[label]} fill={randomColor} label={{ dataKey: 'cluster'}} />)
                            })}
                        }
                    </ScatterChart>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item sm={12}>
                    <Divider />
                        <Typography variant="h5" gutterBottom>Cluster Histogram</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BarChart width={400} height={400} maxBarSize={10} barSize={10} margin={{ top: 5, right: 20, bottom: 10, left: 5 }} data={histogram}>
                        <XAxis dataKey="name"/>
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend/>
                        <Bar dataKey={"Count"} fill="#8884d8" />
                    </BarChart>
                </Grid>
            </Grid> 
        )
    }

    renderHoeffdingTreeStreamCharts(){
        return(
            <Grid container> 
                <Grid item xs={12} sm={12}>
                <p>Progress</p>
                <LineChart width={700} height={350} data={this.props.selected_process.progress.progress} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="accuracy" />
                </LineChart>
                </Grid>
            </Grid>
        )
    }


    renderD3Charts(){
        return (
            <Grid container>  
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={400} data={this.props.selected_process.progress.progress}>
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="accuracy" label={{value: "Accuracy", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="accuracy" stroke="#ff7300" />
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    renderDenstreamCharts(){
        return (
            <Grid container>  
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress} >
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="mean_ari" label={{value: "Adjusted Rand Index", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_ari" stroke="#ff7300" />
                        <Line type="monotone" dataKey="ari" stroke="#38abc8" />
                    </LineChart>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress} >
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="purity" label={{value: "Purity", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_purity" stroke="#ff7300" />
                        <Line type="monotone" dataKey="purity" stroke="#38abc8" />
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    renderClustreamCharts(){
        return (
            <Grid container>  
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress}>
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="mean_ari" label={{value: "Adjusted Rand Index", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_ari" stroke="#ff7300" />
                        <Line type="monotone" dataKey="ari" stroke="#38abc8" />
                    </LineChart>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress} >
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="purity" label={{value: "Purity", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_purity" stroke="#ff7300" />
                        <Line type="monotone" dataKey="purity" stroke="#38abc8" />
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    renderStreamKMCharts(){
        return (
            <Grid container>  
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress}>
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65}/>
                        <YAxis dataKey="mean_ari" label={{value: "Adjusted Rand Index", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_ari" stroke="#ff7300" />
                        <Line type="monotone" dataKey="ari" stroke="#38abc8" />
                    </LineChart>
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item sm={1}>
                    &nbsp;
                </Grid>
                <Grid item xs={12} sm={12}>
                    <LineChart width={800} height={350} data={this.props.selected_process.progress.progress} >
                        <XAxis dataKey="percentage" label={{value: "Data Percentage", position: 'insidebottom'}} height={65} />
                        <YAxis dataKey="purity" label={{value: "Purity", angle: -90, position: 'insideLeft'}}/>
                        <Legend />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="mean_purity" stroke="#ff7300" />
                        <Line type="monotone" dataKey="purity" stroke="#38abc8" />
                    </LineChart>
                </Grid>
            </Grid>
        )
    }

    getRandomColor() { // eren: we need to change this so that every time this function is called, we get the same color for the same data
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

export default ProcessDetails;
