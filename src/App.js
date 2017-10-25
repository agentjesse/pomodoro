import React, { Component } from 'react';
import './App.css';

class App extends Component {

  //constructor function
  constructor(props) {
    //make a call to super
    super(props);
    //set the state
    this.state = {
      time: 1500,//for production: set default 1500s as 25min
      display: 0,
      intervalId:undefined,//initially set from component mount, then custom button
      customMins: 1500,
      sound: new Audio('shipbell.wav')
    };
  }

  componentDidMount() {
    //setInterval returns a value, save it to state part 1/2. to stop the counter call clearInterval(this.state.intervalId)
    let intervalId = setInterval( ()=> { this.timeFunc() }, 1000);
    //setInterval returns a value, save it to state part 2/2. don't console log this, for some reason it will show up right away inaccurately.
    this.setState({intervalId: intervalId});
  }

  timeFunc(){
    // update global time by 1, a second has passed from using setInterval
    this.setState({time: this.state.time - 1});
    
    //check if timer finished and stop it
    if (this.state.time === 0){
      //use iD here as the iD to stop the timer at end before setting id to state
      clearInterval(this.state.intervalId);

      //play sound element constructed in state
      this.state.sound.play();
      // console.log(this.state.sound);

      // console.log('current running interval id: ',this.state.intervalId);
    }
    //get minutes and seconds from current time. they are strings
    let minutes = ('0'+ Math.floor( this.state.time/60 )).slice(-2);
    let seconds = ('0'+ this.state.time % 60).slice(-2);

    //update the state property display 
    this.setState({
      display: minutes + ':' + seconds
      // display: this.state.time
    });
  }

  render() {
    return (
      <div className="App">
        {/* timer display */}
        <div id='timer'>{this.state.display}</div>

        {/* custom time input */}
        <input className='customTimeInput'
          placeholder='enter custom minutes'
          onChange={ event => { this.setState({ customMins: Math.round(event.target.value * 60) }) } }
        />
        <br />
        {/* restart button */}
        <button
          className='customBtn'
          onClick={evt=>{
            //stop setInterval
            clearInterval(this.state.intervalId);
            // set state time to customMins if not zero and is a valid number
            if(this.state.customMins > 0 && typeof this.state.customMins === 'number'){
              this.setState({time:this.state.customMins});
            }//otherwise, reset to 25 mins
            else{
              this.setState({time:1500});
            }
            //to restart the timer you have to call set interval again and assign the new id to state to keep control of it.
            let intervalId = setInterval( ()=> { this.timeFunc() }, 1000);
            this.setState({intervalId: intervalId});
            
          }}>restart pomodoro
        </button>

      </div>
    );
  }
}

export default App;
