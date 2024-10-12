/*
 * AddressInput
 *
 * Description: Handles the styles and user input for addresses and car size
 *
 * Props:
 *      carOptions - an array of dictionaries storing data for the car size dropdown.
 *          each subaray storing:
 *          id    - the JSX/HTML id
 *          value - the value handled by the code (i.e. 'x', 'xl', 's')
 *          name  - the text displayed to the user 
 *      addressError - a function that runs when there is a validation error
 *      handleDistanceAndDuration - 
 *      handleToFirstStation -
 *      handleToFinaldestination -
 *      pathCoord -
 *      onSumbit - Handles the user data inputted from the address boxes, 
 *          and updates inputUpdated state. Passed to AddressInput component
 */

import React from 'react'

import {API_KEY} from '../API'

import './css/AddressInput.css'

import AutocompletePlace from '../../node_modules/react-mapbox-autocomplete'

export default class AddressInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startAddress: '', 
            endAddress: '', 
            startLat: 0,
			startLng: 0,
			endLat: 0,
			endLng: 0, 
            carSize: 'xs',
            mpg: '',
            time: new Date(),
            lastTime: null,
            pathCoord: [],
            toFirstStation : null,
            timeToFirstStation : null, 
            toFinalDestination : null,
            timeToFinalDestination : null,
            lastStartLat: 0,
            lastStartLng: 0,
            lastEndlat: 0,
            lastEndlng: 0,
            lastPathCoord: [],
            carDistance: null,
            carDuration: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({lastTime: this.state.time})
    }

    /*
     * componentDidUpdate()
     *
     * Description: Updates the coordinates variables and calls the distance and duration functions when new lat/lng variable data exists.
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    componentDidUpdate() {
        
        if (JSON.stringify(this.props.pathCoord[0]) != JSON.stringify(this.state.lastPathCoord[0])) {         
            this.calculateDistanceAndDurationToFirstStation()
        }
        if (JSON.stringify(this.props.pathCoord[this.props.pathCoord.length - 1]) != JSON.stringify(this.state.lastPathCoord[this.state.lastPathCoord.length - 1])) {
            this.calculateDistanceAndDurationToFinalDestination()
        }
        if (JSON.stringify(this.props.pathCoord) != JSON.stringify(this.state.lastPathCoord)) { 
            this.setState({lastPathCoord : this.props.pathCoord})      
        }
        if ( (JSON.stringify(this.state.lastTime) != JSON.stringify(this.state.time)) && ( 
        (JSON.stringify(this.state.lastStartLat) != JSON.stringify(this.state.startLat)) ||
        (JSON.stringify(this.state.lastStartLng) != JSON.stringify(this.state.startLng)) ||
        (JSON.stringify(this.state.lastEndLat) != JSON.stringify(this.state.endLat)) ||
        (JSON.stringify(this.state.lastEndLng) != JSON.stringify(this.state.endLng)) ))
       {
            this.setState({lastTime: this.state.time, 
                           lastStartLat: this.state.startLat, 
                           lastStartLng: this.state.startLng,
                           lastEndLat: this.state.endLat, 
                           lastEndLng: this.state.endLng})
            this.calculateDistanceAndDurationByCar()  
        }
        if (JSON.stringify(this.state.lastTime) != JSON.stringify(this.state.time)) {
            this.setState({lastTime: this.state.time})
        }
    }

    /*
     * calculateDistanceAndDurationByCar()
     *
     * Description: Creates a call to the mapbox api using the start and end location coordinates 
     *              to receive the driving route's distance and duration.
     *              Assigns the distance and duration data to local variables and
     *              calls the handleDistanceAndDuration function from indexPage.js,
     *              using the values of the local variables as the function arguments.
     *              to set the corresponding distance and duration variable states in indexPage.js
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */
    
    calculateDistanceAndDurationByCar() {
       let currentComponent = this;
       var startLocation = [this.state.startLng, this.state.startLat]
       var endLocation = [this.state.endLng, this.state.endLat]
       var carDistance = '0'
       var carDuration = '0'
       try {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + API_KEY;
        var req = new XMLHttpRequest();
 
        req.open('GET', url, true);
        req.onload = function() {
          var json = JSON.parse(req.response);
          var data = json.routes[0];
 
         carDistance = Number.parseFloat(data.distance / 1609).toFixed(2),
         carDuration = Number.parseFloat(data.duration / 60).toFixed(2)
 
         currentComponent.props.handleDistanceAndDuration(carDistance, carDuration);
        } 
        req.send();
       }   
       catch(err) {
        console.log(err)
       }
       this.setState({carDistance: carDistance, carDuration: carDuration})  
    }

    /*
     * calculateDistanceAndDuratioToFirstStation()
     *
     * Description: Creates a call the mapbox api using the start location and first station coordinates 
     *              to receive the driving route's distance and duration.
     *              Assigns the distance and duration data to local variables and
     *              calls the handleToFirstStation function from indexPage.js,
     *              using the values of the local variables as the function arguments.
     *              to set the corresponding distance and duration variable states in indexPage.js
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    calculateDistanceAndDurationToFirstStation() {
        let currentComponent = this;
        var startLocation = [this.state.startLng, this.state.startLat]
        var firstStation =  this.props.pathCoord[0]            
        var toFirstStation = '0'
        var timeToFirstStation = '0'       
        try {
 
        var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + startLocation[0] + ',' + startLocation[1] + ';' + firstStation[1] + ',' + firstStation[0] + '?geometries=geojson&access_token=' + API_KEY;
        var req = new XMLHttpRequest();
 
        req.open('GET', url, true);
        req.onload = function() {
          var json = JSON.parse(req.response);
          var data = json.routes[0];
 
          toFirstStation = Number.parseFloat(data.distance / 1609).toFixed(2),
          timeToFirstStation = Number.parseFloat(data.duration / 60).toFixed(2)
 
          currentComponent.props.handleToFirstStation(toFirstStation, timeToFirstStation);
        }
 
        req.send();
        }
        catch(err) {
            console.log(err)
        }
        this.setState({toFirstStation : toFirstStation, timeToFirstStation: timeToFirstStation})
    }

    /*
     * calculateDistanceAndDuratioToFinalDestination()
     *
     * Description: Creates a call the mapbox api using the last station and final destination coordinates 
     *              to receive the driving route's distance and duration.
     *              Assigns the distance and duration data to local variables and
     *              calls the handleToFinalDestination function from indexPage.js,
     *              using the values of the local variables as the function arguments.
     *              to set the corresponding distance and duration variable states in indexPage.js
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    calculateDistanceAndDurationToFinalDestination() {
       let currentComponent = this;
       var lastStation = this.props.pathCoord[this.props.pathCoord.length - 1] 
       var endLocation = [this.state.endLng, this.state.endLat]
       var toFinalDestination = '0'
       var timeToFinalDestination = '0'
       try {
            var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + lastStation[1] + ',' + lastStation[0] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + API_KEY;
            
            var req = new XMLHttpRequest();

            req.open('GET', url, true);
            req.onload = function() {
                var json = JSON.parse(req.response);
                var data = json.routes[0];

                toFinalDestination = Number.parseFloat(data.distance / 1609).toFixed(2),
                timeToFinalDestination = Number.parseFloat(data.duration / 60).toFixed(2)

                currentComponent.props.handleToFinalDestination(toFinalDestination, timeToFinalDestination);
            }

            req.send();
        }
        catch(err) {
            console.log(err)
        }
        this.setState({toFinalDestination : toFinalDestination, timeToFinalDestination: timeToFinalDestination})
    }

    /*
     * handleClick()
     *
     * Description: Handles when the user clicks the submit button
     *
     * Arguments:
     *      e - the HTML button press event
     *
     * Returns:
     *      N/A
     *
     */

    handleClick(e) {
        e.preventDefault();
        //need to make the submit button click log the data in the start and destination boxes

        const searchlog = require("../LogSearch");       
        searchlog.LogSearch(Math.round(new Date().getTime()/1000), this.state.startLat, this.state.startLng, this.state.endLat, this.state.endLng);

        this.setState({time: new Date()});
        this.props.onSubmit(this.state);   
        console.log("SUBMIT BUTTON CLICKED")            
    }

    /*
     * handleChange()
     *
     * Description: Set's the state of this class's props when any values are changed.
     * 
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

    /*
     * handleChange()
     *
     * Description: Passed to a form element and runs each time the user changes the value.
     *
     * Arguments:
     *      e - the HTML event
     *
     * Returns:
     *      N/A
     *
     * Notes: 
     *      This is currently only used by the car size dropdown, but is designed 
     *          to easily be used by any input.
     *
     */

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
        
    }

    /*
     * validate()
     *
     * Description: Used to run validation on the address inputs when the user 
     *      presses submit. Running the desired code based on which input is invalid.
     *
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     *
     * Notes:
     *      This function is "depreciated", and while being called and could be useful
     *          isn't currently doing anything worthwhile.       
     */

    validate(){
        var addressRegEx = /^\d+\s[A-z]+\s[A-z]+ (Ohio)|(Michigan)|(OH)|(MI)|(ohio)|(michigan) \d{5}(?:[-\s]\d{4})?/;
        

        if(!addressRegEx.test(this.state.startAddress)){
           // alert("Starting street address validation failed. Value: " + this.state.startAddress)
        }

        if(!addressRegEx.test(this.state.endAddress)){
          //  alert("Ending street address validation failed. Value: " + this.state.endAddress)
        }
    }


    /*
     * creatCarOptions()
     *
     * Description: Creates the list of dropdown from the carOptions prop.
     *
     * Arguments:
     *      N/A
     *
     * Returns:
     *      options - an array of JSX objects storing the options to be rendered
     *
     */

    createCarOptions() {
        var options = [<option key={-1} value="">Select Car Size</option>];

        for (let i = 0; i < this.props.carOptions.length; i++) {

            let currentCar =this.props.carOptions[i]

            options.push(<option key={currentCar.id} value={currentCar.value}>{currentCar.name}</option>)
        }

        return options;
    }

    render() {
        return(
            <div id="user-input">
                <form onSubmit= {this.handleClick}>

                        <AutocompletePlace
                            inputClass= {'address-input'}
                            placeholder="Starting Location"
                            publicKey={API_KEY}
                            country={'us'}
                            onSuggestionSelect={(result, lat, lng, text) => 
                                this.setState({place1: text, startLat: parseFloat(lat), startLng: parseFloat(lng), startAddress:result})}
                        />
                        <AutocompletePlace
                            inputClass= {'address-input'}
                            placeholder="Ending Location"
                            publicKey={API_KEY}
                            country={'us'}
                            onSuggestionSelect={(result, lat, lng, text) => 
                                this.setState({place2: text, endLat: parseFloat(lat), endLng: parseFloat(lng), endAddress:result})}
                        />
                        
                    <div id="third-row-input">
                        <div id="car-input">
                            <select 
                                name="carSize" 
                                onChange={this.handleChange}
                                required
                            >
                                {this.createCarOptions()}
                            </select>
                        </div>
                        <button type="submit" id="search">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}