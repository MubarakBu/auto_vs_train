/*
 * IndexPage
 *
 * Description: Acts as the parent component, handles recieving data 
 *      from all the other components
 *
 * Props:
 *  N/A
 */


import React        from 'react'
import AddressInput from '../AddressInput/AddressInput';
import Link         from 'next/link';
import PathFinding  from '../PathFinding';
import dynamic from 'next/dynamic';
import * as helperFuncs from '../Functions';

//import InputDisplay from '../InputDisplay/InputDisplay';
import ResultsDisplay from '../ResultsDisplay/ResultsDisplay';
import StationsDisplay from '../StationsDisplay/StationsDisplay';
import HeaderDisplay from '../HeaderDisplay/HeaderDisplay';

import './css/index.css';
import './css/MapBox.css';

const DynamicComponentWithNoSSR = dynamic(() => import('../MapBox/MapBox'), {
    ssr: false
});

export default class IndexComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddressError = this.handleAddressError.bind(this);
        this.getStationsArr = this.getStationsArr.bind(this);
        this.handleDistanceAndDuration = this.handleDistanceAndDuration.bind(this);
        this.handleToFirstStation = this.handleToFirstStation.bind(this);
        this.handleToFinalDestination = this.handleToFinalDestination.bind(this);

		this.state = {

            carData: [
                {id: 0, name: "Extra Small", value: "xs", mpg: 35},
                {id: 1, name: "Small",       value: "s",  mpg: 30},
                {id: 2, name: "Medium",      value: "m",  mpg: 25},
                {id: 3, name: "Large",       value: "l",  mpg: 20},
                {id: 4, name: "Extra Large", value: "xl", mpg: 15},
                {id: 5, name: "Electric",    value: "e",  mpg: NaN}
            ],
            userData: {
                startAddress: '', 
                endAddress: '', 
                startLat: null,
                startLng: null,
                endLat: null,
                endLng: null, 
                carSize: 'xs',
                mpg: '',
                time: new Date()          
            },
            stationsArr: [],
            stationsCoord: [],
            resultDataSet: {
                cost: ['0', '0', '0'],
                time: ['0', '0', '0'],
                co2:  ['0', '0', '0'],
                no2:  ['0', '0', '0']
            },
            inputUpdated: 0,
            trainDistance: 0,
            screenSize: "",		
            trainTime: 0,
            pathCoord: [],
            carRouteToFinalDestinationDistance : 0,
            carRouteToFinalDestinationDuration : 0,
            carRouteDistance : 0,
            carRouteDuration : 0,
            carRouteToFirstStationDistance : 0,
            carRouteToFirstStationDuration : 0,
            lastCarRouteDistance : 0,
            lastCarRouteToFinalDestinationDistance : 0,
            lastCarRouteToFirstStationDistance : 0,
            lastTrainDistance: 0,
            lastCarSize : 'xs',
        }  
    }

    componentDidMount() {
        this.updateResults(this.state.trainDistance, this.state.trainTime)
    }

    /*
     * componentDidUpdate()
     *
     * Description: Updates the tables and graphs when new routes' distance or duration values are calculated
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    componentDidUpdate() {
        if (this.state.carRouteDistance != this.state.lastCarRouteDistance || 
            this.state.carRouteToFinalDestinationDistance != this.state.lastCarRouteToFinalDestinationDistance || 
            this.state.carRouteToFirstStationDistance != this.state.lastCarRouteToFirstStationDistance ||
            this.state.trainDistance != this.state.lastTrainDistance ||
            this.state.userData.carSize != this.state.lastCarSize) {   

            this.updateResults(this.state.trainDistance, this.state.trainTime)
            this.setState({lastCarRouteDistance : this.state.carRouteDistance, 
                lastCarRouteToFinalDestinationDistance : this.state.carRouteToFinalDestinationDistance, 
                lastCarRouteToFirstStationDistance : this.state.carRouteToFirstStationDistance, 
                lastTrainDistance : this.state.trainDistance,
                lastCarSize : this.state.userData.carSize
            })
        }
    } 

    /*
     * handleWindowWidth()
     *
     * Description: updates this.state.screenSize based on the width of the    
     *      screen (sizes based on the bootstrap grid), this is needed for 
     *      logic in some other components such as StationDisplay. Code based
     *      on https://www.hawatel.com/blog/handle-window-resize-in-react/
     *
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    handleWindowWidth() {
        if (window.innerWidth >= 1200) {
            this.setState({screenSize: "xl"});
            console.log("The screen size is: xl");

        } else if (1900 >= window.innerWidth && window.innerWidth >= 992) {
            this.setState({screenSize: "l"});
            console.log("The screen size is: l");

        } else if (991  >= window.innerWidth && window.innerWidth >= 768) {
            this.setState({screenSize: "m"});
            console.log("The screen size is: m");

        } else if (767  >= window.innerWidth && window.innerWidth >= 576) {
            this.setState({screenSize: "s"});
            console.log("The screen size is: s");

        } else if (575  >= window.innerWidth) {
            this.setState({screenSize: "xs"});
            console.log("The screen size is: xs");

        }
    }

    componentDidMount() {
        this.handleWindowWidth();
        window.addEventListener("resize", this.handleWindowWidth.bind(this));
    }

    componenWillUnmount() {
        window.removeEventListener("resize", this.handleWindowWidth.bind(this));
    }

    /*
     * handleSubmit()
     *
     * Description: Handles the user data inputted from the address boxes, 
     *      and updates inputUpdated state. Passed to AddressInput component
     *
     * Arguments:
     *      userInput - what the user inputs from the website
     * Returns:
     *      N/A
     */

    handleSubmit(userInput) { 
        this.setState({
            userData: userInput,
            inputUpdated: this.state.inputUpdated == 1 ? 0 : 1
        });
    }

    /*
     * handleAddressError()
     *
     * Description: alerts the user when an address is not found
     *
     * Arguments:
     *      error - error message that occurs if not route exists between the two addresses
     *
     * Returns:
     *      N/A
     *
     * Notes:
     *      This function doesn't need to exist or at least can be moved within 
     *          the MapBox component itself.
     *
     */

    handleAddressError(error) {
    	if (error == "NOT_FOUND") {
    		alert("We couldn't find a route between those two addresses.");
    	}
    }

    /*
     * arraysEqual()
     *
     * Description: JS doesn't check if two arrays are equal, so we have to do
     *      it manually
     * 
     * Arguments:
     *      a - the first array
     *      b - the second array
     * Returns: 
     *      true if they are equal
     *      false otherwise or if either is empty
     *
     * Notes:
     *      This function can be replaced by using JSON.stringify() whose 
     *          return type can use the == operator
     */

    arraysEqual(a, b) {
        let flag = true;

        if (a == [] || b == []) {
            return false;
        } else if (a.length != b.length) {
            return false;
        }

        a.forEach(function(item, index) {
            if (item != b[index]) {
                flag = false;
            }
        });

        return flag;
    }

    /*
     * getStationsArr()
     *
     * Description: If the list of stations is not the same as currently 
     *      saved, the current stations are replaced by the new ones and 
     *      updates the trainDistance and trainTime states
     * 
     * Arguments:
     *      arr - new array of stations
     *      distance - distance the train would have to travel
     *      time - time the train would have to travel
     *      coordinates - array of station coordinates
     * Returns: 
     *      N/A
     */

    getStationsArr(arr, distance, time, coordinates) {
        if (!this.arraysEqual(arr, this.state.stationsArr) && arr.length != 0){
            if (arr[0] != "No route found") {
                this.setState({stationsArr: arr});
                this.setState({trainDistance: distance});
                this.setState({trainTime: time});
                this.setState({pathCoord: coordinates});
                this.setState({stationsCoord: coordinates});
            }
        }
    }

    /*
     * handleDistanceAndDurtation()
     *
     * Description: Sets the state for distance and duration from start to end location by car
     *
     * Arguments:
     *      distance - the driving distance between the start and end locations inputted from the user
     *      duration - the time it takes to travel the driving route from the two locatins
     *
     * Returns:
     *      N/A
     */
    
    handleDistanceAndDuration(distance, duration) {
        this.setState({carRouteDistance : distance, carRouteDuration : duration})
        
        console.log('======================================================================================================================================================================');
        console.log('Distance between start location (' + this.state.userData.startAddress + ') and end location (' + this.state.userData.endAddress + ') by car is ' + distance + ' miles.');
        console.log('Time traveled between start location (' + this.state.userData.startAddress + ') and end location ('+ this.state.userData.endAddress + ') by car is ' + duration + ' minutes.');
        console.log('======================================================================================================================================================================');
    }

    /*
     * handleToFirstStation()
     *
     * Description: Sets the state for distance and duration from start location to first station by car
     *
     * Arguments:
     *      distance - the driving distance between the start location and the first train station
     *      duration - the time it takes to travel the driving route from the start location to the first station
     *
     * Returns:
     *      N/A
     */
    
    handleToFirstStation(toFirstStation, timeToFirstStation) {
        this.setState({carRouteToFirstStationDistance : toFirstStation, carRouteToFirstStationDuration : timeToFirstStation})

        console.log('======================================================================================================================================================================');
        console.log('Distance from start location (' + this.state.userData.startAddress + ') and the first station (' + this.state.stationsArr[0] + ') by car is ' + toFirstStation + ' miles.' );
        console.log('Time from start location (' + this.state.userData.startAddress + ' and the first station (' + this.state.stationsArr[0] + ') by car is ' + timeToFirstStation + ' minutes.' );
        console.log('======================================================================================================================================================================');
    }

     /*
     * handleToFinalDestination()
     *
     * Description: Sets the state for distance and duration from the last station to the end location by car
     *
     * Arguments:
     *      distance - the driving distance between the last train station and the final destination
     *      duration - the time it takes to travel the driving route from the last station to the final desstination
     *
     * Returns:
     *      N/A
     */
    
    handleToFinalDestination(toFinalDestination, timeToFinalDestination) {
        this.setState({carRouteToFinalDestinationDistance : toFinalDestination, carRouteToFinalDestinationDuration : timeToFinalDestination})
        
        console.log('======================================================================================================================================================================');
        console.log('Distance from last station (' + this.state.stationsArr[1] + ') and the final destination (' + this.state.userData.endAddress + ') by car is ' + toFinalDestination + ' miles.' );
        console.log('Time from last station in (' + this.state.stationsArr[1] + ') and the final destination (' + this.state.userData.endAddress + ') by car is ' + timeToFinalDestination + ' minutes.' );
        console.log('======================================================================================================================================================================');
    }

    /*
     * updateResults()
     *
     * Description: takes in data from the path finding algorithm, calculates 
     *      the results such as cost and emissions, and updates the data for
     *      the graphs
     * 
     * Arguments:
     *      distance - Distance the train would travel
     *      trainTime - How long the train trip would take
     * Returns:
     *      N/A
     */

    updateResults(distance, trainTime) {
        console.log("UPDATE RESULTS");

        let tempResults = this.state.resultDataSet;

        var carSizeArrayNumber;

        switch(this.state.userData.carSize) {
            case "xs":
                 carSizeArrayNumber = 0;
                 break;
            case "s":
                 carSizeArrayNumber = 1;
                 break;
            case 'm':
                carSizeArrayNumber = 2;
                break;
            case 'l':
                carSizeArrayNumber = 3;
                break;
            case 'xl':
                carSizeArrayNumber = 4;
                break;
            case 'e':
                carSizeArrayNumber = 5;
                break;
          }

        // Assigning Local Variables to Uae in Calculations
          var carDistance = this.state.carRouteDistance;
          var carDuration = this.state.carRouteDuration;
          var carDistanceToFirstStation = this.state.carRouteToFirstStationDistance;
          var carDurationToFirstStation = this.state.carRouteToFirstStationDuration;
          var carDistanceToFinalDestination = this.state.carRouteToFinalDestinationDistance;
          var carDurationToFinalDestination = this.state.carRouteToFinalDestinationDuration;
        
        // ------------  
        // --- Cost ---
        // ------------

        // Auto
        let carCost = helperFuncs.calculate_cost("car", carDistance);
        tempResults.cost[0] = Number.parseFloat(carCost[carSizeArrayNumber]).toFixed(2);

        // Train
        let trainCost = helperFuncs.calculate_cost("train", distance);
        let carCostForTrainToFirstStation = helperFuncs.calculate_cost("car", carDistanceToFirstStation);
        let carCostForTrainToFinalDestination = helperFuncs.calculate_cost("car", carDistanceToFinalDestination);

        tempResults.cost[1] = Number.parseFloat(trainCost[0] + carCostForTrainToFirstStation[carSizeArrayNumber] + carCostForTrainToFinalDestination[carSizeArrayNumber]).toFixed(2);
        tempResults.cost[2] = Number.parseFloat(trainCost[1] + carCostForTrainToFirstStation[carSizeArrayNumber] + carCostForTrainToFinalDestination[carSizeArrayNumber]).toFixed(2);

        // ------------
        // --- Time ---
        // ------------

        // Auto
        tempResults.time[0] = Number.parseFloat(carDuration).toFixed(2); 

        // Train

        // For some Reason, These numbers are not being added/ displayed in the graph
        tempResults.time[1] = (Number.parseFloat(trainTime) + Number.parseFloat(carDurationToFirstStation) + Number.parseFloat(carDurationToFinalDestination)).toFixed(2);
        tempResults.time[2] = (Number.parseFloat(trainTime) + Number.parseFloat(carDurationToFirstStation) + Number.parseFloat(carDurationToFinalDestination)).toFixed(2);

        // ------------
        // --- CO2 ---
        // -----------

        // Auto
        let carCo2 = helperFuncs.calculate_CO2("car", carDistance);
        tempResults.co2[0] = Number.parseFloat(carCo2[carSizeArrayNumber]).toFixed(2);

        // Train
        let trainCo2 = helperFuncs.calculate_CO2("train", distance);
        let carCo2ToFirstStation = helperFuncs.calculate_CO2("car", carDistanceToFirstStation); 
        let carCo2ToFinalDestination =  helperFuncs.calculate_CO2("car", carDistanceToFinalDestination);

        tempResults.co2[1] = Number.parseFloat(trainCo2[0] + carCo2ToFirstStation[carSizeArrayNumber] + carCo2ToFinalDestination[carSizeArrayNumber]).toFixed(2);
        tempResults.co2[2] = Number.parseFloat(trainCo2[1] + + carCo2ToFirstStation[carSizeArrayNumber] + carCo2ToFinalDestination[carSizeArrayNumber]).toFixed(2);
        
        //  Save Data
        this.setState({
            resultDataSet: tempResults,
            inputUpdated: this.state.inputUpdated == 1 ? 0 : 1
        });
    }

    render () {
        return (
            <div id="index-page">
                <HeaderDisplay />
                <AddressInput 
                    carOptions={this.state.carData} 
                    onSubmit={this.handleSubmit}
                    addressError={this.state.addressError}
                    handleDistanceAndDuration={this.handleDistanceAndDuration}
                    handleToFirstStation={this.handleToFirstStation}
                    handleToFinalDestination={this.handleToFinalDestination}
                    pathCoord = {this.state.pathCoord}
                    />   
                <div id="map-display">
                    <DynamicComponentWithNoSSR
                        userData={this.state.userData}
                        onError={this.handleAddressError}
                        stationsCoor = {this.state.stationsCoord}
                    />
                </div>

                <PathFinding
                    start_latitude ={this.state.userData.startLat} 
                    start_longitude={this.state.userData.startLng} 
                    end_latitude   ={this.state.userData.endLat} 
                    end_longitude  ={this.state.userData.endLng}
                    handleStationsArr = {this.getStationsArr}
                />
                <StationsDisplay 
                    stations = {this.state.stationsArr}
                    screenWidth={this.state.screenSize}
                />
                <ResultsDisplay 
                    data={this.state.resultDataSet} 
                    updateNotifier={this.state.inputUpdated}
                />
            </div>
    	)
    }
}