import React from 'react';
import {HOST} from '../config'
//import {getRoutes} from '../components/fakeserver';


export default class allStationRoutes extends React.Component {	
    constructor(props) {
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          stationroutes: []      
      };
    };

    componentDidMount() {
        fetch(`http://${HOST}/stationroutes`)
        .then( response => response.json())
        .then( 
                (result) => {
                    this.setState({
                        isLoaded : true,
                        stationroutes : result,
                        error: false
                    });
                },
    
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error : true
                    })
                    console.log(error)
                },
        )
      
    };


  render() {
          const {error, isLoaded, stationroutes} = this.state;

          if(error){
              return <div>Error in loading</div>
          }
          else if (!isLoaded) {
              return <div>Loading ...</div>
          }
          else if (stationroutes.length==0) {
              return<div>No records found</div>
          }
          else{
              return(                  
                  <div>
                      <ol>
                      {
                          this.state.stationroutes.map(stationroute => (
                              <li key={stationroute.station_id_1 + stationroute.station_id_2} align="start">
                                  <div>
                                      <p>Station 1: {stationroute.station_id_1}</p>
                                      <p>Station 2: {stationroute.station_id_2}</p>
                                      <p>Distance: {stationroute.distance}</p>
                                      <p>Travel Time: {stationroute.travel_time}</p>
                                  </div>
                              </li>
                          ))
                      }
                      </ol>
                  </div>
              );
          }    
      }
    }