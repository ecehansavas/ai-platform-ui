import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Tooltip } from '@material-ui/core';

class ProcessesList extends React.Component {

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
       "stable":"Synthesised Dataset--3 (Stable)",
       "hyperplane":"Hyperplane Generator",
       "sea":"Sea Generator"
    }

    /**
     * Represents the process details like algorithm, dataset, start and finished time, etc.
     */
    render(){
        const header = {id: 'ID',
                        dataset: 'DATA',
                        algorithm: 'ALGORITHM',
                        state:'STATE',
                        start_time:'START TIME',
                        finish_time: 'FINISH TIME',
                        details: 'DETAILS',
                        delete: 'DELETE'}
        return (
        <form>
            <br />
            <Grid container spacing={5}>
                <Grid item sm={9}>
                    <Typography variant="h4" component="h1" gutterBottom><AssignmentIcon />PROCESSES</Typography>
                </Grid>
                <Grid item sm={3}>
                    <Button fullWidth variant="contained" onClick={()=>{this.props.newProcess()}}>
                        Start new Process
                    </Button>
                </Grid>
            </Grid>
            <br />
            <TableContainer style={{maxHeight:400}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{header.id}</TableCell>
                            <TableCell>{header.dataset}</TableCell>
                            <TableCell>{header.algorithm}</TableCell>
                            <TableCell>{header.state}</TableCell>
                            <TableCell>{header.start_time}</TableCell>
                            <TableCell>{header.finish_time}</TableCell>
                            <TableCell>{header.details}</TableCell>
                            <TableCell>{header.delete}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTableData()}
                    </TableBody>
                </Table>                    
            </TableContainer>
        </form>
        );
    }
    
    /**
     * Renders the process table
     */
    renderTableData(){
        return this.props.process_list.sort((a, b) => b.id - a.id).map((item, index) => {
            const { id, dataset_name, algorithm_name, state, started_at, finished_at} = item //destructuring
            let formattedFinishDate= finished_at ? Moment(finished_at).format('DD.MM.YYYY hh:mm:ss') : ""
            let formattedStartDate =started_at ? Moment(started_at).format('DD.MM.YYYY hh:mm:ss') : ""
            return (
               <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{this.HUMAN_READABLE_DATASET_NAMES[dataset_name]}</TableCell>
                  <TableCell>{this.HUMAN_READABLE_ALGORITHM_NAMES[algorithm_name]}</TableCell>
                  <TableCell>{this.setStateIcon(state)}</TableCell>
                  <TableCell>{formattedStartDate}</TableCell>
                  <TableCell>{formattedFinishDate}</TableCell>
                  <TableCell><Button onClick={(e) => this.props.showDetails(id)}>Details<BarChartIcon /></Button> 
                  </TableCell>
                  <TableCell><Button onClick={() => {if(window.confirm('Delete the item?')){this.props.delete(id)};}}>
                        <DeleteForeverIcon />
                      </Button>
                  </TableCell>
               </TableRow>
            )
         })
    } 

    setStateIcon(state){
        if (state === "finished") {
            return (<Tooltip title="Completed"><CheckIcon /></Tooltip>)
        }
        else if (state === "failed") {
            return (<Tooltip title="Failed"><CloseIcon /></Tooltip>)
        }
        else if(state === "queued"){
            return (<Tooltip title="Queued"><ScheduleIcon/></Tooltip>)
        }
        else {
            return (<Tooltip title="In Progress"><SyncIcon /></Tooltip>)
        }
    }
}

export default ProcessesList;