const passwordHash = require('../helpers/passwordHash');

module.exports = function(sequelize, DataTypes){
  const User = sequelize.define('User',
    {
        id: { 
            type: DataTypes.BIGINT.UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true
        },

        username : { 
            type: DataTypes.STRING,
            //이름은 50글자를 넘어서는 안된다.
            validate : {
                len : [0, 50]
            },
            allowNull : false
        },
        
        password : { 
            type: DataTypes.STRING,
            validate : {
                len : [3, 100]
            } ,
            allowNull : false
        },
        
        displayname : { type: DataTypes.STRING }

    },{
        tableName: 'User'
    }
  );

  //sequelize hooks
  User.beforeCreate(( user, _ ) => {
      user.password = passwordHash(user.password);
  });

  return User;
}