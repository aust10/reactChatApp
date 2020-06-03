// eslint-disable-next-line
import React, {component} from 'react'
// import io from 'socket.io-client'
import './App.css'
// const io = require('socket.io-client')
import io from 'socket.io-client'
import GetRooms from './components/getrooms'
import Chat from './components/chatdisplay'

const socket = io()
console.log(socket, 'this is socket')

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

  addRoom () {
    const roomName = prompt('Enter a room name')
    this.setState({ room: roomName })
    console.log(this.state, 'This is the entered room name')
  }

  componentDidMount () {
    socket.on('chat message', msg => {
      console.log('Got a message:', msg)
      this.setState({ messages: this.state.messages.concat(msg) })
    })
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
    const message = { text: this.state.value, date: this.state.time, room: this.state.room }
    // this.setState({ messages: this.state.messages.concat(message) })

    // first line of socket
    socket.emit('chat message', message)
    console.log(message)
 
    // fetch('/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ text: this.state.value, date: this.state.time, room: this.state.room })
    // })
    //   .then(data => {
    //     console.log('Success:', data)
    //   })
    //   .then(this.state.value = '')
    //   .catch((error) => {
    //     console.error('Error:', error)
    //   })
    // this.setState({ messages: this.state.messages.concat(message) })
    // socket.emit('chat message', message)
  }
  // this.setState({ message: msg })

  render () {
    return (
      <div className='App'>
        <div id='chat-container' />
        <button onClick={() => this.addRoom()}>Add Room</button>
        <GetRooms messages={this.state.messages} room={this.state.room} handle={this.handleInput.bind(this)} />
        <form id='send-message' onSubmit={this.handleSubmit}>
          <textarea id='message-text' value={this.state.value} onChange={this.handleChange} placeholder='message...' />
          <button type='submit'>Send</button>
        </form>
        <Chat messages={this.state.messages} room={this.state.room} />
      </div>
    )
  }
}

export default App
