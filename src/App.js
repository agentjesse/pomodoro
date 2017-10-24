import React, { Component } from 'react';
import './App.css';

class App extends Component {

  //constructor function
  constructor(props) {
    //make a call to super
    super(props);
    //set the state
    this.state = {
      time: 13,//1500s is 25min
      display: 0
    };
    //run a method in this class component
    this.startTimer();
  }

  startTimer(){
    //setInterval returns a value, let's call it interval. to stop the counter, call clearInterval(interval). 
    let interval = setInterval( ()=>{
      // update global time by 1, a second has passed from using setInterval
      this.setState({time: this.state.time - 1});

      //get minutes and seconds from current time. they are strings
      let minutes = ('0'+ Math.floor( this.state.time/60 )).slice(-2);
      let seconds = ('0'+ this.state.time % 60).slice(-2);

      //check if timer finished
      if (minutes === '00' && seconds === '00'){
        clearInterval(interval);
      }

      //display them by updating the state 
      this.setState({
        display: minutes + ':' + seconds
        // display: this.state.time
      });

    } ,1000);
  }

  render() {
    return (
      <div className="App">
        <p id='timer'>{this.state.display}</p>
      </div>
    );
  }
}

export default App;
