import DatabaseViews from '../components/DatabaseViews';
import SearchLogs from '../views/SearchLog';
import React from 'react';
//const DB = require('../Models/Sequelize');

export default function SearchLog() {	

    return (	  
      <div>
            <title>Search Log</title>
            <DatabaseViews />
            <p></p>
            <strong>This page displays the search log for the website:</strong>
            <SearchLogs />
            
        
      </div>
    );
  }

