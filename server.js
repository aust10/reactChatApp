const fs = require('fs')
const express = require('express')
const port = 8000
const app = express()
const messagesPath = './messages.txt'
app.use(express.static('static'))
app.use(express.json())

app.get('/messages', (req, res) => {
  fs.readFile(messagesPath, 'utf8', (err, text) => {
    if (err) return res.status(500).send(err)

    const messages = text
      .split('\n')
      .filter(txt => txt) // will filter out empty string
      .map(JSON.parse)

    return res.json(messages)
  })
})

app.post('/messages', (req, res) => {
  // console.log(req)
  const message = JSON.stringify(req.body)
  fs.appendFile(messagesPath, '\n' + message, err => {
    if (err) return res.status(500).send(err)

    return res.send('post successful')
  })
})

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    console.log(msg, 'this is msg on server')
    io.emit('chat message', msg)
    fs.appendFile(messagesPath, '\n' + JSON.stringify(msg), err => err ? console.log(err) : null)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
// changed from app to http for socket
http.listen(port, () => console.log('serving on port 8000'))
