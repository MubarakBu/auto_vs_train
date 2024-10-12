exports.Stations = function(Model, Sequelize, sequelize) {
  class Stations extends Model {}

  Stations.init({
    // attributes
    station_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    station_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'stations',
    // options
    timestamps: false,
    freezeTableName: true
  });

  return Stations
}