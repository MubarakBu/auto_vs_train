exports.SearchLog = function (Model, Sequelize, sequelize){
    class SearchLog extends Model {}
    SearchLog.init({
      // attributes
      search_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      ipaddress: {
        type: Sequelize.STRING,
      },
      searchtime: {
        type: Sequelize.INTEGER,
      },
      start_latitude: {
          type: Sequelize.FLOAT,
      },
      start_longitude: {
          type: Sequelize.FLOAT,
      },
      end_latitude: {
        type: Sequelize.FLOAT,
      },
      end_longitude: {
        type: Sequelize.FLOAT,
      }
    }, {
      sequelize,
      modelName: 'search_log',
      // options
      timestamps: false,
      freezeTableName: true
    });    

    return SearchLog;
}