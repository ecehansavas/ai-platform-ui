import React from 'react';

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.startProcess = this.startProcess.bind(this);
        this.stopProcess = this.stopProcess.bind(this);
        this.continue = this.continue.bind(this);
        this.restart = this.restart.bind(this);
    }

    render(){
        return (
            <div>
                <button onClick={this.startProcess}>Start</button>
                <button onClick={this.stopProcess}>Stop</button>
                <button onClick={this.continue}>Continue</button>
                <button onClick={this.restart}>Restart</button>
            </div>
        );
    }

    // eren: do we use this file? do we have plans to do so?

    startProcess(){
        console.log('Run Algo Run');
    }

    stopProcess(){
        console.log('S-T-O-P I-T!!');
    }

    continue(){
        console.log('CONTINUE');
    }

    restart(){
        console.log('Re-Start');
    }
}

export default SubmitButton;