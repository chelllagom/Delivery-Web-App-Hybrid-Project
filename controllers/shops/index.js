const { Router } = require('express');
const router = Router();
const ctrl = require('./shops.ctrl');

//정규식으로 숫자만 받음
router.get('/:id(\\d+)', ctrl.get_shop_detail);

module.exports = router;