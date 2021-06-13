const { Router } = require('express');
const router = Router()

router.get('/', async ( _ , res ) => {
    res.render( 'admin/shops.html');
});
router.use('/admin', require('./admin'));
router.use('/accounts', require('./accounts'));
router.use('/auth', require('./auth'));

module.exports = router;