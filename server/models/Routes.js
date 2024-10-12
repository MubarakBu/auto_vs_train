exports.Routes = function (Model, Sequelize, sequelize) {
    class Routes extends Model {}
    Routes.init({
      // attributes
      station_id_1: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      station_id_2: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      travel_time: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      
    }, {
      sequelize,
      modelName: 'routes',
      // options
      timestamps: false,
      freezeTableName: true
    });

    return Routes;
}