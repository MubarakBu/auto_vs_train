import DatabaseViews from '../components/DatabaseViews';
import PathFinding from '../components/PathFinding.js';

export default function DB_Maintenance() {	
  //location hard coded for testing
  return (	  
    <div>
        <title>Database Maintenance</title>
        <DatabaseViews />
        <p>Database Maintenance Page</p>
        <PathFinding start_latitude={41.3748} 
                     start_longitude={-83.6513} 
                     end_latitude={39.9612} 
                     end_longitude={-82.9988}
                     handleStationsArr={function(arr){null;}}
        />
    </div>
  );
}

