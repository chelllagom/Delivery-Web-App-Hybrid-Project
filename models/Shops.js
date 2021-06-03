const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Shops = sequelize.define('Shops',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING , comment: '상점명' },
            address : { type: DataTypes.STRING , comment: '주소' },
            location : { type: DataTypes.STRING , comment: '상세주소' },
            phone : { type: DataTypes.STRING , comment: '전화번호' },
            open_time : { type: DataTypes.STRING , comment: '운영시간' },
            cell_phone : { type: DataTypes.STRING , comment: '핸드폰번호' }
        }
    );

    // 메뉴 모델 관계도
    Shops.associate = (models) => {
        //1:N 관계
        Shops.hasMany( models.ShopsMenu, {
            //as를 이용하면 컨트롤러에서 함수 만들 때 semantic하게 제작 가능
            as : 'Menu',
            // 메뉴 모델에 외부키를 건다
            foreignKey : 'shop_id',
            sourceKey : 'id',
            onDelete : 'CASCADE'
        });
    }

    Shops.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );

    return Shops;
}