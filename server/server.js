const express = require("express");
const cors = require('cors')
const app = express();

const dotenv = require('dotenv').config();  // loads in the .env file

const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV == 'development') {
  var sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: '../db_script/avtDB.db'
    });
  
  } else if (process.env.NODE_ENV == 'production') {
    var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,     
      pool: { 
        maxConnections: 20,
        maxIdleTime: 30000
      },
    });
  };

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Model = Sequelize.Model;

const Stations = require("./models/Stations").Stations(Model, Sequelize, sequelize);

const SearchLog = require("./models/SearchLog").SearchLog(Model, Sequelize, sequelize);

const Routes = require("./models/Routes").Routes(Model, Sequelize, sequelize);





//the below foreign keys aren't quite right
//Routes.hasOne(Stations, {foreignKey: 'station_id_1'})
//Routes.hasOne(Stations, {foreignKey: 'station_id_2'})

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Why are you here?!'));

app.listen(process.env.PORT, () => console.log(`Express Server listening on port ${process.env.PORT}!`));

//all these endpoints could be moved to an api file

//endpoint for seeing all the stations
app.get('/stations', (req, res, next) => Stations.findAll().then(station => {
    res.send(station);
  }));

//add an endpoint for searchlog
app.get('/searchlog', (req, res, next) => SearchLog.findAll().then(searchlogs => {
  res.send(searchlogs);
}));

//add an endpoint for /stationroutes
app.get('/stationroutes', (req, res, next) => Routes.findAll().then(stationroutes => {
  res.send(stationroutes);
}));

//The POST api's are a work in progress and are untested



//api for adding stations to the DB
app.post('/addstation', (req, res) => {
  return Stations.create({
      //station_id: req.body.station_id,     //id should auto-increment
      station_name: req.body.station_name,
      status: req.body.status,
      latitude: req.body.latitude,
      longitude: req.body.longitude
  }).then( (Stations) => {
      if (Stations) {
          res.send(Stations);
      } else {
          res.status(400).send('Error inserting new record');
      }
  });
});

//api for adding routes to the DB
app.post('/addroute', (req, res) => {
  return Routes.create({
      station_id_1: req.body.station_id_1,     //id should auto-increment
      station_id_2: req.body.station_id_2,
      distance: req.body.distance,
      travel_time: req.body.travel_time
  }).then( (routes) => {
      if (Routes) {
          res.send(Routes);
      } else {
          res.status(400).send('Error inserting new record');
      }
  });
});


//api for adding search requests to the DB
app.post('/addsearch', (req, res) => {
  return SearchLog.create({
      //search_id should auto increment
      ipaddress: req.body.ipaddress,     
      searchtime: req.body.searchtime,
      start_latitude: req.body.start_latitude,
      start_longitude: req.body.start_longitude,
      end_latitude: req.body.end_latitude,
      end_longitude: req.body.end_longitude
  }).then( (Searchlog) => {
      if (Searchlog) {
          res.send(Searchlog);
      } else {
          res.status(400).send('Error inserting new record');
      }
  });
});