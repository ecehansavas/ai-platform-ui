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

class ProcessesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const header = {id: 'ID',
                        dataset: 'Dataset',
                        algorithm: 'Algorithm',
                        evaluation: 'Evaluation',
                        state:'State',
                        start_time:'Start Time',
                        finish_time: 'Finish Time',
                        details: 'Details'}
        return (
        <form>
            <Grid container spacing={5}>
                <Grid item sm={12}>
                    <Typography variant="h4" component="h1" gutterBottom>Processes</Typography>
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
    // TODO: time ı burada formatla
    renderTableData(){
        return this.props.process_list.sort((a, b) => b.id - a.id).map((item, index) => {
            const { id, dataset_name, algorithm_name, evaluation, state, started_at, finished_at, details } = item //destructuring
            return (
               <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{dataset_name}</TableCell>
                  <TableCell>{algorithm_name}</TableCell>
                  <TableCell>{evaluation}</TableCell>
                  <TableCell>{state}</TableCell>
                  <TableCell>{started_at}</TableCell>
                  <TableCell>{finished_at}</TableCell>
                  <TableCell><Button onClick={(e) => this.props.showDetails(id)}>Click for Details</Button></TableCell>
               </TableRow>
            )
         })
    }
}

export default ProcessesList;