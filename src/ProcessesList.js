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

class ProcessesList extends React.Component {

    render(){
        const header = {id: 'ID',
                        dataset: 'DATA',
                        algorithm: 'ALGORITHM',
                        evaluation: 'EVALUATION',
                        state:'STATE',
                        start_time:'START TIME',
                        finish_time: 'FINISH TIME',
                        details: 'DETAILS',
                        delete: 'DELETE'}
        return (
        <form>
            <Grid container spacing={5}>
                <Grid item sm={12}>
                    <Typography variant="h4" component="h1" gutterBottom>PROCESSES</Typography>
                </Grid>
            </Grid>
            <TableContainer style={{maxHeight:400}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{header.id}</TableCell>
                            <TableCell>{header.dataset}</TableCell>
                            <TableCell>{header.algorithm}</TableCell>
                            <TableCell>{header.evaluation}</TableCell>
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
    
    renderTableData(){
        return this.props.process_list.sort((a, b) => b.id - a.id).map((item, index) => {
            const { id, dataset_name, algorithm_name, evaluation, state, started_at, finished_at} = item //destructuring
            let formattedFinishDate= finished_at ? Moment(finished_at).format('DD.MM.YYYY hh:mm:ss') : ""
            let formattedStartDate =started_at ? Moment(started_at).format('DD.MM.YYYY hh:mm:ss') : ""
            return (
               <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{dataset_name}</TableCell>
                  <TableCell>{algorithm_name}</TableCell>
                  <TableCell>{evaluation}</TableCell>
                  <TableCell>{state}</TableCell>
                  <TableCell>{formattedStartDate}</TableCell>
                  <TableCell>{formattedFinishDate}</TableCell>
                  <TableCell><Button onClick={(e) => this.props.showDetails(id)}>Click for Details</Button></TableCell>
                  <TableCell><Button onClick={() => {if(window.confirm('Delete the item?')){this.props.delete(id)};}}>Delete</Button></TableCell>
               </TableRow>
            )
         })
    } 
    
}

export default ProcessesList;