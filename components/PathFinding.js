/*
 * Name: PathFinding
 *
 * Description: Finds the closest train stations to the start and end point then finds a train route between the two
 *              train stations.
 *
 * Props: 
 *      start_latitude - The latitude of the starting location
 *      start_longitude - The longitude of the starting location
 *      end_latitude - The latitude of the desitination location
 *      end_longitude - The longitude of the destination location
 *      handleStationsArr - the handle for returning the train path, distance, and time
 */


import React from 'react';
import {findClosest, find_route, resolveStationName, namedPath, resolveStationCoord, coordPath} from './Functions'
import {HOST} from '../config'

// REMOVE THE FOLLOWING LINE
import './ResultsDisplay/css/ResultsDisplay.css'

export default class PathFinding extends React.Component {	
    constructor(props) {
      super(props);
      this.state = {
          error : null,
          isLoadedStations : false,
          isLoadedRoutes: false,
          stations : [],
          routes: [],
          start_latitude: this.props.start_latitude,  
          start_longitude: this.props.start_longitude,
          end_latitude: this.props.end_latitude,
          end_longitude: this.props.end_longitude     
      }
    }

    // REACT lifecycle function.  Fetches the train station and train route information from the data base on mount.
    componentDidMount() {
        fetch(`http://${HOST}/stations`)
      .then( response => response.json())
      .then( 
            (result) => {
                this.setState({
                    isLoadedStations : true,
                    stations : result,
                    error: false
                  });
            },

            (error) => {
                this.setState({
                    isLoadedStations: true,
                    error : true
                })
                console.log(error)
            },
      )
      fetch(`http://${HOST}/stationroutes`)
        .then( response => response.json() )
        .then( 
            (result) => {
                this.setState({
                    isLoadedRoutes : true,
                    routes : result,
                    error_routes: false
                  });
            },

            (error) => {
                this.setState({
                    isLoadedRoutes: true,
                    error_routes : true
                })
                console.log(error)
            },
        )
    }

    // REACT lifecycle function.  Updates the closest station and routing information if any of the start/end latitude
    // or longitude change
    componentDidUpdate() {
        if (JSON.stringify(this.state.start_latitude) != JSON.stringify(this.props.start_latitude) | 
        JSON.stringify(this.state.start_longitude) != JSON.stringify(this.props.start_longitude) |
        JSON.stringify(this.state.end_latitude) != JSON.stringify(this.props.end_latitude) | 
        JSON.stringify(this.state.end_longitude) != JSON.stringify(this.props.end_longitude)) {
            this.setState({start_latitude: this.props.start_latitude, start_longitude: this.props.start_longitude, 
                end_latitude: this.props.end_latitude, end_longitude: this.props.end_longitude})
            this.updateRoutes()
        }
    }

    //See Function.js for detailed documentation
    findClosest(lat, long) {
        return findClosest(lat, long, this.state.stations);
    };

    //See Function.js for detailed documentation
    find_route(station_start, station_stop) {
        return find_route(station_start, station_stop, this.state.stations, this.state.routes)    
    };

    //See Function.js for detailed documentation
    resolveStationName(station_id) {
        return resolveStationName(station_id, this.state.stations)
    }

    //See Function.js for detailed documentation
    namedPath(trainPath) {
        return namedPath(trainPath, this.state.stations)
    }

    //See Function.js for detailed documentation
    resolveStationCoord(station_id) {   
        return resolveStationCoord(station_id, this.state.stations)
    };

    //See Function.js for detailed documentation
    coordPath(trainPath) {  
        return coordPath(trainPath, this.state.stations)
    };

    /*
    * prettyPrintPath(named_path)
    *
    * Description: Converts an array of station names to a single string with markers in between
    *      
    * Arguments:
    *      namedPath - list of strings - The station names along the path
    *      
    *     
    * Returns
    *      path_string - string - Names of the stations with => in between each
    */ 

    prettyPrintPath(named_path) {
        let path_string = named_path[0]
        for (let i=1; i < named_path.length; i+=1) {
            path_string = path_string.concat(' => ', named_path[i])
        }
        return path_string
    }

    /*
    * updateRoutes()
    *
    * Description: Runs the sequence for finding the train route
    *      
    * Arguments:
    *      None
    *      
    *     
    * Returns
    *      None, but returns the (train_path, distance, time) to IndexPage.js via handleStationsArr
    */ 

    updateRoutes() {
        const {error, isLoadedStations, isLoadedRoutes, stations} = this.state;
        const start_latitude = this.props.start_latitude;
        const start_longitude =  this.props.start_longitude;
        const end_latitude = this.props.end_latitude;
        const end_longitude = this.props.end_longitude;
        var travel_time = 0
        var distance = 0
        if(error){
            console.log(`Error in loading`);
        }
        else if (!isLoadedStations || !isLoadedRoutes) {
            console.log(`Loading databases...`);
        }
        else if (stations.length==0) {
            console.log(`Error: No stations found`);
        }
        else if (start_latitude === null || start_longitude === null || end_latitude === null || end_longitude === null) {
        console.log(`Waiting on user input`);
        }
        else{
            
            var closest_start = this.findClosest(start_latitude, start_longitude)  //returns station ID of closest
            var closest_end = this.findClosest(end_latitude, end_longitude)
            var train_path_results = this.find_route(closest_start, closest_end)  //returns path (with IDs), distance, time
            if (train_path_results[0] == "No route found") {     //fix for no route.  Might need to change in future.
            var train_path = train_path_results;
            distance = 0;
            travel_time = 0;
            } else {
            var train_path = this.namedPath(train_path_results[0]);  //converts path from IDs to Names
            var train_path_coordinates = this.coordPath(train_path_results[0]); // converts path from IDs to [lat & long]
            distance = train_path_results[1];
            travel_time = train_path_results[2];
            };         

            //handle to pass the train path, distance, and time back up
            this.props.handleStationsArr(train_path, distance, travel_time, train_path_coordinates);
            
            //log for development testing

            /*
            var start_name = this.resolveStationName(closest_start)  //resolves stationID into Names
            var end_name = this.resolveStationName(closest_end)

            console.log(`====================================================`);
            console.log(`Starting station: (${closest_start}) ${start_name}`);
            console.log(`Ending station  : (${closest_end}) ${end_name}`);
            console.log(`Path array      :` + train_path );
            console.log(`Travel time     : ${travel_time.toFixed(0)}`);
            console.log(`Distance        : ${distance.toFixed(1)}`);
            console.log(`====================================================`);
            */
        }   

    }

    render() {            
        return null;
    }
}

