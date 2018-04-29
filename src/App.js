import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      color: false,
      error: false
    }
  }
  handleClick (cmd) {
    if (this.ws) {
      this.ws.send(cmd)
    }
  }
  componentDidMount () {
    // COMMENT ONE this.ws line
    // You need to know the EV3 IP to connect to it; wired connection default: 10.0.1.1
    // this.ws = new WebSocket('ws://10.0.1.1:8887') // Use this when working with EV3 brick
    this.ws = new WebSocket('ws:localhost:8887') // Use this when developing locally
    this.ws.onopen = e => {
      this.setState({
        color: 'black'
      })
      console.log('WebSocket connection is ready! Current state: ')
      console.log(this.state)
    }
    this.ws.onerror = e => this.setState({
      error: 'WebSocket error'
    })
    this.ws.onclose = e => !e.wasClean && this.setState({
      error: `WebSocket connection closed: ${e.code} ${e.reason}`
    })
    this.ws.onmessage = e => {
      this.setState({color: e.data})
    }
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div><p>Current color:</p></div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 25
        }}>
          <div style={{
            backgroundColor: this.state.color,
            height: 200,
            width: 200,
            border: 'solid 2px black'
          }}/>
        </div>
        <p>
            Control EV3 with arrows
        </p>
        <button onMouseDown={(e) => this.handleClick('UP')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8593)}</button>
        <button onMouseDown={(e) => this.handleClick('DOWN')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8595)}</button>
        <button onMouseDown={(e) => this.handleClick('LEFT')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8592)}</button>
        <button onMouseDown={(e) => this.handleClick('RIGHT')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8594)}</button>
        <button onMouseDown={(e) => this.handleClick('SABOTAGE')} >SABOTAGE</button>
      </div>
    )
  }
}

export default App
