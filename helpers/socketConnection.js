require('../helpers/removeByValue')();

module.exports = (io) =>{
    
    let userList = [];

    io.on('connection', (socket) =>{

        const session = socket.request.session.passport;
        const user = (typeof session !== 'undefined') ? (session.user) : '';

        if(!userList.includes(user.displayname)){
            userList.push(user.displayname);
        }

        //join 이벤트 전달
        io.emit('join', userList);

        //disconnect 예약어로 사용자가 나가는 것 감지
        socket.on('disconnect', ()=>{
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        });
        
        //console.log('소켓서버 접속');
        // 소켓 서버 응답 받기
        socket.on('client message', (data)=>{
            //응답 받은 메시지 전체 클라이언트에게 전달
            io.emit('server message', {
                message : data.message,
                displayname : user.displayname
            });
        });
    });
}