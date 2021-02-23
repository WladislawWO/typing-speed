import React from 'react';

export default class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 60,
      isOn: false,
      start: 60
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }
  startTimer() {
    this.setState({...this.state, isOn: true})
    this.timer = setInterval(() => this.setState({
      time: this.state.time - 1
    }), 1000);
    setTimeout(this.stopTimer, 6000);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  render() {
    return(
      <div>
        <h3>timer: {this.state.time}</h3>
        <button onClick={this.startTimer}>start</button>
        <button onClick={this.stopTimer}>stop</button>
      </div>
    )
  }
}