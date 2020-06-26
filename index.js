require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'));
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route')

app.get('/', (req, res) => {
  res.send('ok3 nka')
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`)
  })

  socket.on('user-join-room', username => {
    socket.join(username);
    for (r in socket.adapter.rooms) {
      console.log('rooms:', r);
    }
  })

  socket.on('client-like', data => {
    socket.join(data.viewer);
    console.log(data.viewer);
    io.sockets.in(data.viewer).emit('like', 'like ne');
  });


});

app.use('/users', userRoute)
app.use('/posts', postRoute)

http.listen(PORT, () => {
  console.log(`Server has run on port ${PORT}`);
});
