const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//암호화 모듈
const passwordHash = require('../helpers/passwordHash');
const models = require('../models');

//정책 작성(input태그에서 어떤 필드를 받아오겠다)
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  async ( req , username , password, done) => {
    const user = await models.User.findOne({
        where : {
            username,
            password : passwordHash(password)
        },
        //비밀번호는 제외하고 보여주기위해
        attributes : {exclude : ['password']}
    })

      if(!user){//없으면 false
          return done(null, false, { message : '일치하는 아이디 패스워드가 없습니다.'});
      }else{//있으면 data넘겨줌
          return done(null, user.dataValues);
      }
  })
);

//done의 user.dataValues를 user로 받아옴
//처음 로그인이 성공했을 때 작동
passport.serializeUser(  (user, done) => {
    console.log('serializeUser');
    done(null, user);
});

//페이지를 이동하면서 작동
passport.deserializeUser(  (user, done) => {
    console.log('deserializeUser');
    done(null, user);
});

module.exports = passport;