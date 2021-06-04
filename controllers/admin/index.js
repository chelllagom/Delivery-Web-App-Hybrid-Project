const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
//정적파일(이미지,css 등) 경로
const path = require('path');
//__dirname은 현재 폴더위치, 즉 controllers/admin까지 반환해줌
//uploadDir은 root경로임
const uploadDir = path.join(__dirname, '../../uploads');

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

const upload = multer({ storage: storage });

router.get('/shops', ctrl.get_shops );

router.get('/shops/write', ctrl.get_shops_write );

//html의 input name이 thumbnail이기 때문에
//파일 요청이 1건이면 single, 여러 건이면 array로 처리
router.post('/shops/write', upload.single('thumbnail'), ctrl.post_shops_write );

router.get('/shops/detail/:id', ctrl.get_shops_detail );

router.get('/shops/edit/:id', ctrl.get_shops_edit );

router.post('/shops/edit/:id', ctrl.post_shops_edit );

router.get('/shops/delete/:id', ctrl.get_shops_delete );

//메뉴 작성
router.post('/shops/detail/:id', ctrl.add_menu);

//메뉴 삭제
router.get('/shops/delete/:shop_id/:menu_id', ctrl.remove_menu);

module.exports = router;
