import Heapify from 'heapify';
import getDistance from 'geolib/es/getDistance';
import {data, ticket_ppm, gas_price, electric_price, cost_IRS, CO2_lpm_d, CO2_lpm_e, CO2_lpg, 
    CO2_lpkwh, NOx_gpg, NOx_gpkwh, NOx_gpm_d, NOx_gpm_e} from './Constants'

/*
* calculate_cost(type, distance)
*
* Description: Calculates the trip costs for a train or car trip based on distance traveled.  
*      Trips with multiple legs and types will need to call this function for each leg.
*      
*
* Arguments:
*      type - string - Allowed values are 'car' or 'train'
*      distance - float - The trip distance for which the costs are calculated
* Returns
*      6 element array of numeric values.  
*               For a 'train' type, positions 0 and 1 are electric train and diesel train costs
*               For a 'car' type, positions 0 through 5 are xsmall, small, medium, large, electric costs respectively
*               If type is other than 'car' or 'train' an array of 0's are returned
*/ 

function calculate_cost(type, distance) {   // type is a string, either 'car' or 'train', distance is a number in miles
    // might consider moving costs into its own module and focus solely on environmental impact
    if (type == "train") {
        let cost = ticket_ppm * distance
        return [cost, cost, 0, 0, 0]  // [electric trains, diesel train]
    } else if (type == "car") {
        let cost = [];
        cost.push(distance / data["car-xsmall"].mpg * gas_price);
        cost.push(distance / data["car-small"].mpg * gas_price);
        cost.push(distance / data["car-medium"].mpg * gas_price);
        cost.push(distance / data["car-large"].mpg * gas_price);
        cost.push(distance / data["car-xlarge"].mpg * gas_price);
        cost.push(distance / 100 * data["car-electric"].kwhp100 * electric_price);
        return cost  // [xsmall, small, medium, large, electric]
    } else {return [0,0,0,0,0,0]}
    
};

/*
* calculate_CO2(type, distance)
*
* Description: Calculates the CO2 emissions for a train or car trip based on distance traveled.  
*      Trips with multiple legs and types will need to call this function for each leg.
*      
*
* Arguments:
*      type - string - Allowed values are 'car' or 'train'
*      distance - float - The trip distance for which the costs are calculated
* Returns
*      6 element array of numeric values.  
*               For a 'train' type, positions 0 and 1 are electric train and diesel train CO2 emissions
*               For a 'car' type, positions 0 through 5 are xsmall, small, medium, large, electric CO2 emissions respectively
*               If type is other than 'car' or 'train' an array of 0's are returned
*/ 


function calculate_CO2(type, distance) {   // type is a string, either 'car' or 'train', distance is a number in miles
    if (type == "train") {                      
        let diesel_emissions = CO2_lpm_d * distance            
        let electric_emissions = CO2_lpm_e * distance
        return [diesel_emissions, electric_emissions, 0, 0, 0]
    } else if (type == "car") {
        let emissions = []
        emissions.push(distance / data["car-xsmall"].mpg * CO2_lpg)
        emissions.push(distance / data["car-small"].mpg * CO2_lpg)
        emissions.push(distance / data["car-medium"].mpg * CO2_lpg)
        emissions.push(distance / data["car-large"].mpg * CO2_lpg)
        emissions.push(distance / data["car-xlarge"].mpg * CO2_lpg)
        emissions.push(distance / 100 * data["car-electric"].kwhp100 * CO2_lpkwh)
        return emissions
    } else {return [0,0,0,0,0,0]}
}

/*
* calculate_NOx(type, distance)    
*
* Description: Calculates the NOx emissions for a train or car trip based on distance traveled.  
*      Trips with multiple legs and types will need to call this function for each leg.
*      
*
* Arguments:
*      type - string - Allowed values are 'car' or 'train'
*      distance - float - The trip distance for which the costs are calculated
* Returns
*      6 element array of numeric values.  
*              For a 'train' type, positions 0 and 1 are electric train and diesel train NOx emissions
*              For a 'car' type, positions 0 through 5 are xsmall, small, medium, large, electric NOx emissions respectively
*              If type is other than 'car' or 'train' an array of 0's are returned
*/ 

function calculate_NOx(type, distance) {
    if (type == "train") {                      
        let diesel_emissions = CO2_lpm_d * distance            
        let electric_emissions = CO2_lpm_e * distance
        return [diesel_emissions, electric_emissions, 0, 0, 0]
    } else if (type == "car") {
        let emissions = []
        emissions.push(distance / data["car-xsmall"].mpg * NOx_gpg)
        emissions.push(distance / data["car-small"].mpg * NOx_gpg)
        emissions.push(distance / data["car-medium"].mpg * NOx_gpg)
        emissions.push(distance / data["car-large"].mpg * NOx_gpg)
        emissions.push(distance / data["car-xlarge"].mpg * NOx_gpg)
        emissions.push(distance / 100 * data["car-electric"].kwhp100 * NOx_gpkwh)
        return emissions
    } else {return [0,0,0,0,0,0]}
}


/*
* find_route(station_start, station_stop, stations, routes)
*
* Description: Finds a train route between two train stations using an A* search algorithm
*      
*
* Arguments:
*      station_start - integer - Station ID for the train station where the trip begins
*      station_stop - integer - Station ID for the train station where the trip ends
*      stations - json - Results from the station database query
*      routes - json - Results from the train route database query
* Returns
*      3 element array.  
*           path - list of integers - a list of stations IDs that represent the train route
*           distance - float - the total distance traveled over the train route
*           time - float - the total time traveled over the train route
*/ 


function find_route(station_start, station_stop, station_list, routes) {  
    var adj_list = new Map();
    var queue = new Heapify();  //using a min-heap priority queue for A* search
    var closed = [];
    var parent_list = new Map();
    var g_cost_list = new Map();
    var h_cost_list = new Map();
    var total_time = new Map();
    var start_index = null;
    var end_index = null;
    for (let i=0; i < station_list.length; i+=1) {  //finding the index for the start and end
        if (station_list[i].station_id == station_start) {start_index = i} 
        if (station_list[i].station_id == station_stop) {end_index = i}
    }
    //add a map to store the adjacency list, parent node and costs
    for (let i=0; i < station_list.length; i+=1) {
        adj_list.set(station_list[i].station_id, []);  //initialize the adjacency list for each station
        parent_list.set(station_list[i].station_id, null);
        g_cost_list.set(station_list[i].station_id, Infinity);
        total_time.set(station_list[i].station_id, null);
        //use a straight line distance heuristic
        h_cost_list.set(station_list[i].station_id, getDistance(
            {latitude: station_list[i].latitude, longitude: station_list[i].longitude}, 
            {latitude: station_list[end_index].latitude, longitude: station_list[end_index].longitude}));
    }
    for (let i=0; i < routes.length; i+=1) {
        adj_list.get(routes[i].station_id_1).push( [routes[i].station_id_2, routes[i].distance, routes[i].travel_time] )
        adj_list.get(routes[i].station_id_2).push( [routes[i].station_id_1, routes[i].distance, routes[i].travel_time] )  //currently the routes database is undirected
    }
            
    g_cost_list.set(station_start, 0);
    total_time.set(station_start, 0);
    queue.push(station_start, g_cost_list.get(station_start) + h_cost_list.get(station_start)); //seed the queue
            
    while(queue.length != 0) {
        var current = queue.pop();  
        closed.push(current);
        if (current == station_stop) {
            var path = [current];
            var distance = g_cost_list.get(current);
            var time = total_time.get(current);
            while (current != station_start) {
                current = parent_list.get(current);
                path.unshift(current);
            }
            return [path, distance, time];
        };
        adj_list.get(current).forEach(element => {
            if (closed.includes(element[0])) { 

            } else {
                    g_cost_list.set(element[0], g_cost_list.get(current) + element[1])
                    total_time.set(element[0], total_time.get(current) + element[2])
                    queue.push(element[0], g_cost_list.get(element[0]) + h_cost_list.get(element[0]))
                    parent_list.set(element[0], current)
            } 
            
        });
    }
    console.log("No route found")
    return ["No route found",0,0]
        
};


/*
* findClosest(lat, long, stations)
*
* Description: Finds the closest train station to a location (lat, long)
*      
*
* Arguments:
*      lat - float - latitude of the location
*      long - float - longitude of the location
*      stations - json - Results from the station database query
*      
*     
* Returns
*      minStation - integer - Station ID of the closest station
*/ 

function findClosest(lat, long, stations) {  //input lat/long of location and stations json, output station ID
    const start = {latitude: lat, longitude: long};
    let minDistance = Infinity;
    let minStation = null;
    let station_list = stations;
    for (let i=0; i < station_list.length; i+=1) {
        let dest = {latitude: station_list[i].latitude, longitude: station_list[i].longitude};
        let d = getDistance(start, dest);
        if (d < minDistance) {
            minDistance = d;
            minStation = station_list[i].station_id;
        }
    }
    
    return minStation;

};

/*
* resolveStationName(station_id, stations)
*
* Description: Looks up a station name from a station ID
*      
*
* Arguments:
*      station_id - integer - The station ID of the station to look up
*      stations - json - Results from the station database query
*      
*     
* Returns
*      station_name - string - Name of the station
*/ 

function resolveStationName(station_id, stations) {   //input station id and the station json
    let station_name = "No Station Found By That ID"
    stations.forEach( station => {
        if (station.station_id == station_id) {
            station_name = station.station_name
        }
    })
    return station_name
};

/*
* namedPath(trainPath, stations)
*
* Description: Converts an array of station IDs to station names
*      
*
* Arguments:
*      trainPath - list of integers - The station IDs of the station to look up
*      stations - json - Results from the station database query
*      
*     
* Returns
*      temp_path - list of strings - Names of the stations
*/ 

function namedPath(trainPath, stations) {  
    let temp_path = []
    trainPath.forEach( station => {
        temp_path.push(resolveStationName(station, stations))
    })
    return temp_path
 };


/*
* resolveStationCoord(station_id, stations)
*
* Description: Converts an array of station IDs to station names
*      
*
* Arguments:
*      trainPath - list of integers - The station IDs of the station to look up
*      stations - json - Results from the station database query
*      
*     
* Returns
*      temp_path - list of strings - Names of the stations
*/ 

function resolveStationCoord(station_id, stations) {   
    let station_coord = [0.0, 0.0]
    stations.forEach( station => {
        if (station.station_id == station_id) {
            station_coord[0] = station.latitude
            station_coord[1] = station.longitude
        }
    })
    return station_coord
};


/*
* coordPath(trainPath, stations)
*
* Description: Converts an array of station IDs to station names
*      
*
* Arguments:
*      trainPath - list of integers - The station IDs of the station to look up
*      stations - json - Results from the station database query
*      
*     
* Returns
*      temp_path - list of tuples of floats - lat and long for each station along the train path
*/ 


function coordPath(trainPath, stations) {  
    let temp_path = []
    trainPath.forEach( station => {
        temp_path.push(resolveStationCoord(station, stations))
    })
    return temp_path
 };

export{ calculate_cost, calculate_CO2, calculate_NOx, find_route, findClosest, resolveStationName, namedPath, resolveStationCoord, coordPath}