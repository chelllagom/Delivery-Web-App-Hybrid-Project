const app = require('./app.js');
const port = 3000;

const server = app.listen( port, function(){
    console.log('Express listening on port', port);
});

//소켓 모듈 가져옴
const listen = require('socket.io');
//3000포트 서버에 소켓 서버를 붙임
const io = listen(server);

//미들웨어 작성할 때 use 함수 사용
//socket io passport 접근하기 위한 미들웨어 적용
io.use( (socket, next) => {
    app.sessionMiddleWare(socket.request, socket.request.res, next);
});

//분리한 소켓 서버 모듈 가져옴
const socketConnection = require('./helpers/socketConnection');
//호출
socketConnection(io);