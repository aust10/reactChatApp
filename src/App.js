import React from 'react'
// import socket from 'socket.io-client'
import './App.css'

function GetRooms (props) {
  const rooms = props.messages.map(msg => msg.room)
  const filtered = rooms.filter(room => room)
  console.log(filtered, 'this is the rooms')
  return <select onInput={props.handle} value={props.room}>
    <option value=''>--Select a Room--</option>
    {filtered.map(room => <option key={room} value={room}>{room}</option>)}
             </select>
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      nick: '',
      time: new Date(),
      room: '',
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    fetch('/messages')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log('fetched data from server')
        this.setState({
          messages: data
          // this.state.messages.concat(the new message)
        })
      })
      // .then(getRooms(this.state.messages))
      .then(console.log(this.state, 'this is the state'))
  }

  handleInput (event) {
    this.setState({ room: event.target.value })
    console.log(event.target.value)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state.value)
    const message = { text: this.state.value, date: this.state.time }
    this.setState({ messages: this.state.messages.concat(message) })

    // changeRoom () {
    //   if (the room === this.state.room) {
    //     we want to show
    //   }
    // }

    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.value, date: this.state.time })
    })
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    // this.setState({ messages: this.state.messages.concat(message) })
    // socket.emit('chat message', message)
  }
  // this.setState({ message: msg })

  render () {
    return (
      <div className='App'>
        <div id='chat-container' />
        <button onClick={() => this.callApi()}>Get Messages</button>
        <GetRooms messages={this.state.messages} room={this.state.room} handle={this.handleInput.bind(this)} />
        <form id='send-message' onSubmit={this.handleSubmit}>
          <textarea id='message-text' value={this.state.value} onChange={this.handleChange} placeholder='message...' />
          <button type='submit'>Send</button>
        </form>
        <div>
          {this.state.messages.map((message, i) => <li key={i}>{(new Date(message.date)).toLocaleString()} ~ {message.text}</li>)}
        </div>
      </div>
    )
  }
}

export default App
