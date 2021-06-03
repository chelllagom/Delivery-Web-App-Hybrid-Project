module.exports = (sequelize, DataTypes) => {
    const ShopsMenu = sequelize.define('ShopsMenu',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING , comment: '메뉴명' },
            price : { type: DataTypes.INTEGER , comment: '가격' }
        },{
            //sequelize에서 자동으로 s를 붙여줘서 tableName을 적어줌!
            tableName: 'ShopsMenu'
        }
    );
    
    return ShopsMenu;
}