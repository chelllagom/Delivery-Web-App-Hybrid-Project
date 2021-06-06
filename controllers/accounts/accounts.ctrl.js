const models = require('../../models');
const passwordHash = require('../../helpers/passwordHash');

exports.get_join = ( _ , res ) => {
    res.render( 'accounts/join.html');
}

exports.post_join = async (req, res) => {
    //req.body.password = passwordHash(password);
    //models.User.create(req.body);

    //hook 사용
    try{
        //중복 아이디 처리!
        await models.User.create(req.body);
        res.send('<script>alert("회원가입 성공"); location.href="/accounts/login"</script>');    
    }catch(e){

    }
}

exports.get_login = ( _ , res ) => {
    res.render( 'accounts/login.html');
}
