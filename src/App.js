import React from 'react'
import logo from './logo.svg'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      color: false,
      error: false,
      keyMap: {
        up: false,
        down: false,
        right: false,
        left: false

      }
    }
  }

  handleClick (cmd) {
    if (this.ws) {
      this.ws.send(cmd)
    }
  }

  handlePress (e) {
    if (this.ws) { // WebSocket online
      let keyPosition
      if (e.type === 'keydown') {
        keyPosition = true
      } else if (e.type === 'keyup') {
        keyPosition = false
      }
      switch (e.key) {
        case 'w':
          this.setState({...this.state, keyMap: {...this.state.keyMap, up: keyPosition}})
          break
        case 's':
          this.setState({...this.state, keyMap: {...this.state.keyMap, down: keyPosition}})
          break
        case 'a':
          this.setState({...this.state, keyMap: {...this.state.keyMap, left: keyPosition}})
          break
        case 'd':
          this.setState({...this.state, keyMap: {...this.state.keyMap, right: keyPosition}})
          break
        default:
          break
      }
    }
  }

  handleWebSocketOutMessage () {
    let cmd = ''
    if (this.state.keyMap.down === true) {
      cmd += 'DOWN'
    }
    if (this.state.keyMap.up === true) {
      cmd += 'UP'
    }
    if (this.state.keyMap.right === true) {
      cmd += 'RIGHT'
    }
    if (this.state.keyMap.left === true) {
      cmd += 'LEFT'
    }

    if (this.ws) {
        if (cmd === '') {
          this.ws.send('STOP')
        } else {
      this.ws.send(cmd)
        }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', (e) => this.handlePress(e)) // Register KeyDown
    document.addEventListener('keyup', (e) => this.handlePress(e)) // Register KeyUp

    // COMMENT ONE this.ws line
    // You need to know the EV3 IP to connect to it; wired connection default: 10.0.1.1
    this.ws = new WebSocket('ws://10.0.1.255:8887') // Use this when working with EV3 brick
    // this.ws = new WebSocket('ws:localhost:8887') // Use this when developing locally
    this.ws.onopen = e => {
      this.setState({
        color: 'gray'
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
      this.setState({...this.state, keyMap: {...this.state.keyMap}, color: e.data})
    }
  }
  componentDidUpdate (props, prevState) {
    if (prevState.keyMap.up !== this.state.keyMap.up) {
      console.log(this.state)
      this.handleWebSocketOutMessage()
    }
    if (prevState.keyMap.down !== this.state.keyMap.down) {
      console.log(this.state)
      this.handleWebSocketOutMessage()
    }
    if (prevState.keyMap.right !== this.state.keyMap.right) {
      console.log(this.state)
      this.handleWebSocketOutMessage()
    }
    if (prevState.keyMap.left !== this.state.keyMap.left) {
      console.log(this.state)
      this.handleWebSocketOutMessage()
    }
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to EV3 Remote Client</h1>
          <p>powered by React & WebSockets</p>
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
            Control EV3 with arrows or with WASD
        </p>
        <button onMouseDown={(e) => this.handleClick('UP')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8593)}</button>
        <button onMouseDown={(e) => this.handleClick('DOWN')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8595)}</button>
        <button onMouseDown={(e) => this.handleClick('LEFT')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8592)}</button>
        <button onMouseDown={(e) => this.handleClick('RIGHT')} onMouseUp={(e) => this.handleClick('STOP')} >{String.fromCharCode(8594)}</button>
        <button onMouseDown={(e) => this.handleClick('ESCAPE')} >Escape</button>
        <button onMouseDown={(e) => this.handleClick('SABOTAGE')} >Sabotage</button>
        <footer style={{
          position: 'absolute',
          marginTop: '425px',
          marginBottom: '25pxpx',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          bottom: 0}}>Harri Mähönen & Rattopojat v2.0</footer>
      </div>
    )
  }
}

export default App
