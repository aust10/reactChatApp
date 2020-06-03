// eslint-disable-next-line
import React, {component} from 'react'

function Chat (props) {
  const message = props.messages.filter(msg => msg.room === props.room)
  console.log(message, 'this is the chat message')
  // const filtered = message.filter(msg => msg.room === room)
  return <div class='roomChat'>
    <ul>
      {message.map(message => <li key={message}><span>{message.text}</span></li>)}
    </ul></div>
}

export default Chat
