import React from 'react';
import BorderWrapper from 'react-border-wrapper'

class ProcessesList extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
        <form>
            <BorderWrapper>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Dataset</th>
                                <th>Algorithm</th>
                                <th>Status</th>
                                <th>Start Time</th>
                                <th>Finish Time</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Kdd Cup 19</td>
                                <td>Hoeffding-Tree</td>
                                <td>Completed</td>
                                <td>07.01.2020 06:20</td>
                                <td>07.01.2020 06:30</td>
                                <td>Link</td>
                            </tr>
                            <tr>
                                <td>Kdd Cup 19</td>
                                <td>K-Means</td>
                                <td>Processing</td>
                                <td>07.01.2020 06:10</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>


                        </tbody>
                    </table>                    

                </div>
            </BorderWrapper>
        </form>
        );
    }
}

export default ProcessesList;