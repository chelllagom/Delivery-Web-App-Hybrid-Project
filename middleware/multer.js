//정적파일(이미지,css 등) 경로
const path = require('path');
//__dirname은 현재 폴더위치, 즉 controllers/admin까지 반환해줌
//uploadDir은 root경로임
const uploadDir = path.join(__dirname, '../uploads');

//multer 셋팅
const multer  = require('multer');
const storage = multer.diskStorage({
    destination :  (req, file, callback) => { 
        //이미지가 저장되는 도착지 지정
        callback(null, uploadDir );
    },
    filename :  (req, file, callback) => { 
        // shops-날짜.jpg(png) 저장, mimetype이 image/jpeg라서 split함
        callback(null, 'shops-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
    }
});

module.exports = multer({ storage: storage });
