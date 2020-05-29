import React from 'react'

import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      nick: '',
      time: new Date(),
      room: ''
    }
  }

  callApi () {
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
  }

  render () {
    return (
      <div className='App'>
        <div id='chat-container' />
        <button onClick={() => this.callApi()}>Get Messages</button>
        <select>
          <option value="">--Select a Room--</option>
        </select>
        <div>
          {this.state.messages.map((message, i) => <li key={i}>{(new Date(message.date)).toLocaleString()} ~ {message.text}</li>)}
        </div>
        <form id='send-message'>
          <input id='message-text' type='text' name='description' placeholder='message...' />
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  }
}

export default App
