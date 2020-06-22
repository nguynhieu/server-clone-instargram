const express = require('express');
const { Socket } = require('dgram');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('ok3 nka')
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
});

http.listen(PORT, () => {
  console.log(`Server has run on port ${PORT}`);
});
