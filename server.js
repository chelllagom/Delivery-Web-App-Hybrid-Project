const app = require('./app.js');
const port = 3000;

const server = app.listen( port, function(){
    console.log('Express listening on port', port);
});

//소켓 모듈 가져옴
const listen = require('socket.io');
//3000포트 서버에 소켓 서버를 붙임
const io = listen(server);
//분리한 소켓 서버 모듈 가져옴
const socketConnection = require('./helpers/socketConnection');
//호출
socketConnection(io);