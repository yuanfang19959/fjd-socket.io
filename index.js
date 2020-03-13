const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  // 当有新的用户进入聊天室的时候
  socket.on('userID', function (data) {
    io.emit('userID', data);
  });

  // 当收到用户发来的消息时
  socket.on('mes', function(data) {
    // 群发消息
    io.emit('serverMes', data);
    console.log(data)
  })
});

// 中间件
app.use(express.static(__dirname + '/assets'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

server.listen(3000);