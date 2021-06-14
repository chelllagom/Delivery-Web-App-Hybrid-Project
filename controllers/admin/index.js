const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const upload = require('../../middleware/multer');
const csrfProtection = require('../../middleware/csrf');
const loginRequired = require('../../middleware/loginRequired');

router.get('/shops', ctrl.get_shops );

//이부분 아래로는 미들웨어가 작동함(로그인이 되어 있어야 진행 가능)
//router.use(loginRequired);

router.get('/shops/write', csrfProtection, ctrl.get_shops_write );

//html의 input name이 thumbnail이기 때문에
//파일 요청이 1건이면 single, 여러 건이면 array로 처리
//csrfToken이 enctype="multipart/form-data" 이후에 나와야 해서 순서가 뒤에 있음
router.post('/shops/write', upload.single('thumbnail'), csrfProtection, ctrl.post_shops_write );

router.get('/shops/detail/:id', ctrl.get_shops_detail );

router.get('/shops/edit/:id', csrfProtection, ctrl.get_shops_edit );

router.post('/shops/edit/:id', upload.single('thumbnail'), csrfProtection, ctrl.post_shops_edit );

router.get('/shops/delete/:id', ctrl.get_shops_delete );

//메뉴 작성
router.post('/shops/detail/:id', ctrl.add_menu);

//메뉴 삭제
router.get('/shops/delete/:shop_id/:menu_id', ctrl.remove_menu);

module.exports = router;
