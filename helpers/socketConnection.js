module.exports = (io) =>{
    io.on('connection', (socket) =>{
        //console.log('소켓서버 접속');
        // 소켓 서버 응답 받기
        socket.on('client message', (data)=>{
            //응답 받은 메시지 전체 클라이언트에게 전달
            io.emit('server message', data.message);
        });
    });
}