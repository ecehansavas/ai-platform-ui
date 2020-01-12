import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dataset from './Dataset';
import Algorithm from './Algorithm';
import ProcessesList from './ProcessesList';
import DetailedView from './DetailedView';

class App  extends React.Component {
  constructor(props) {
    super(props);
}

  render(){
    return (
      <div className="App">
        <Dataset />
        <Algorithm />
        <ProcessesList />
        <DetailedView />  
      </div>
    );
  }
  
}

export default App;
