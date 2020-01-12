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
        return this.props.processList.map((item, index) => {
            const { id, dataset, algorithm, state, start_time, finish_time, details } = item //destructuring
            return (
               <tr key={id}>
                  <td>{id}</td>
                  <td>{dataset}</td>
                  <td>{algorithm}</td>
                  <td>{state}</td>
                  <td>{start_time}</td>
                  <td>{finish_time}</td>
                  <td>{details}</td>
                  <td><button type="button" onClick={(e) => this.props.showDetails(id)}>Tıkla Bana</button></td>
               </tr>
            )
         })
    }
}

export default ProcessesList;