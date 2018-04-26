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
    this.ws = new WebSocket('ws://10.0.1.1:8887')
        this.ws.onmessage = e => {
            this.setState({ color: e.data })
            console.log("success: " + e.data)
            console.log(this.state)}
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
    //setInterval( () => {this.ws.send("STOP")}, 1000 )

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
        <button onMouseDown={(e) => this.handleClick("UP")} onMouseUp={(e) => this.handleClick("STOP")} >{String.fromCharCode(8593)}</button>
        <button onMouseDown={(e) => this.handleClick("DOWN")} onMouseUp={(e) => this.handleClick("STOP")} >{String.fromCharCode(8595)}</button>
	<button onMouseDown={(e) => this.handleClick("LEFT")} onMouseUp={(e) => this.handleClick("STOP")} >{String.fromCharCode(8592)}</button>
	<button onMouseDown={(e) => this.handleClick("RIGHT")} onMouseUp={(e) => this.handleClick("STOP")} >{String.fromCharCode(8594)}</button>    
	<button onMouseDown={(e) => this.handleClick("SABOTAGE")} >SABOTAGE</button>    
</div>
    );
  }
}


export default App;
