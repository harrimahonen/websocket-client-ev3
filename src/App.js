import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ws = new WebSocket('ws://localhost:8887')
    ws.onopen = function() {
     console.log("connection open...");
   };
class App extends Component {
    constructor(){
        super()
        this.state = {
    }
        this.handleClick = this.handleClick.bind(this)
    } 
    handleClick(cmd){
       ws.send(JSON.stringify({
            to: "sec-websocket-indetifier",
            message: cmd }
         )
     )
    }
    componentDidMount(){
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <div >
        <p className="App" >
            Click on the arrows to send web socket message to server
        </p>
        <p onClick={(e) => this.handleClick("UP")} >{String.fromCharCode(8593)}</p>
        <p onClick={(e) => this.handleClick("LEFT")} >{String.fromCharCode(8592)}</p>
        <p onClick={(e) => this.handleClick("RIGHT")} >{String.fromCharCode(8594)}</p>
        <p onClick={(e) => this.handleClick("DOWN")} >{String.fromCharCode(8595)}</p>
    </div>
      </div>
    );
  }
}


export default App;
