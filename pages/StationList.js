import DatabaseViews from '../components/DatabaseViews';
import AllStations from '../views/AllStations';
import React from 'react';
//const DB = require('../Models/Sequelize');

export default function StationList() {	

    return (	  
      <div>
            <title>Train Stations</title>
            <DatabaseViews />
            <p></p>
            <strong>This page lists the train stations in the database</strong>
            <AllStations />
        
      </div>
    );
  }

