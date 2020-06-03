// eslint-disable-next-line
import React, { component } from 'react'

function GetRooms (props) {
  const rooms = props.messages.map(msg => msg.room)
  rooms.push(props.room)
  const filtered = rooms.filter(room => room)
  const simplified = Array.from(new Set(filtered))
  console.log(simplified, 'this is the rooms')
  return <select onInput={props.handle} value={props.room}>
    <option value=''>--Select a Room--</option>
    {simplified.map(room => <option key={room} value={room}>{room}</option>)}
  </select>
}

export default GetRooms