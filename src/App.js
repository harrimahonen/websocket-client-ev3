import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(){
        super()
        this.state = {
            color: false,
            error: false
    }
            
    } 
    handleClick(cmd){
           this.ws.send(cmd)
    }
    componentDidMount(){
    this.ws = new WebSocket('ws://localhost:8887')
        this.ws.onmessage = e => {
            this.setState({ color: e.data })
            console.log("success: " + e.data)
            console.log(this.state)}
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` }) 
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <div style={{display: 'flex',
            justifyContent: 'center',
            marginTop: 25}}>
            <div style={{
        backgroundColor:this.state.color,
        height:100,
        width: 100
            }}/>
        </div>
        <p className="App" >
            Click on the arrows to send web socket message to server
        </p>
        <p onClick={() => this.handleClick("UP")} >{String.fromCharCode(8593)}</p>
        <p onClick={() => this.handleClick("LEFT")} >{String.fromCharCode(8592)}</p>
        <p onClick={() => this.handleClick("RIGHT")} >{String.fromCharCode(8594)}</p>
        <p onClick={() => this.handleClick("DOWN")} >{String.fromCharCode(8595)}</p>

    </div>
    );
  }
}


export default App;
