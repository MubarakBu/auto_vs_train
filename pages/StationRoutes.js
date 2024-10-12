import DatabaseViews from '../components/DatabaseViews';
import AllStationRoutes from '../views/StationRoutes';
import React from 'react';
//const DB = require('../Models/Sequelize');

export default function RouteList() {	

    return (	  
      <div>
            <title>Train Stations</title>
            <DatabaseViews />
            <p></p>
            <strong>This page lists the train stations routes in the database</strong>
            <AllStationRoutes />
        
      </div>
    );
  }

