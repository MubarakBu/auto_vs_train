import React from 'react';
import {HOST} from '../config'
//import {getStations} from '../components/fakeserver'


export default class allStations extends React.Component {	
    constructor(props) {
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          stations : []        
      };
    };

    componentDidMount() {
        fetch(`http://${HOST}/stations`)
        .then( response => response.json())
        .then( 
              (result) => {
                  this.setState({
                      isLoaded : true,
                      stations : result,
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
          const {error, isLoaded, stations} = this.state;

          if(error){
              return <div>Error in loading</div>
          }
          else if (!isLoaded) {
              return <div>Loading ...</div>
          }
          else if (stations.length==0) {
            return<div>No records found</div>
          }
          else{
              return(                  
                  <div>
                      <ol>
                      {
                          this.state.stations.map(station => (
                              <li key={station.station_id} align="start">
                                  <div>
                                      <p>Station ID: {station.station_id}</p>
                                      <p>Name: {station.station_name}</p>
                                      <p>Status: {station.status}</p>
                                      <p>Latitude: {station.latitude}, Longitude: {station.longitude}</p>
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