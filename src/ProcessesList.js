import React from 'react';
import BorderWrapper from 'react-border-wrapper'

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
            <BorderWrapper>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>{header.id}</th>
                                <th>{header.dataset}</th>
                                <th>{header.algorithm}</th>
                                <th>{header.evaluation}</th>
                                <th>{header.state}</th>
                                <th>{header.start_time}</th>
                                <th>{header.finish_time}</th>
                                <th>{header.details}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>                    

                </div>
            </BorderWrapper>
        </form>
        );
    }
    renderTableData(){
        return this.props.process_list.map((item, index) => {
            const { id, dataset_name, algorithm_name, evaluation, state, started_at, finished_at, details } = item //destructuring
            return (
               <tr key={id}>
                  <td>{id}</td>
                  <td>{dataset_name}</td>
                  <td>{algorithm_name}</td>
                  <td>{evaluation}</td>
                  <td>{state}</td>
                  <td>{started_at}</td>
                  <td>{finished_at}</td>
                  <td>{details}</td>
                  <td><button type="button" onClick={(e) => this.props.showDetails(id)}>Click for Details</button></td>
               </tr>
            )
         })
    }
}

export default ProcessesList;