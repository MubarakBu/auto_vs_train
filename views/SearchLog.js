import React from 'react';
import {HOST} from '../config'


export default class allSearchLog extends React.Component {	
    constructor(props) {
      super(props);
      this.state = {
          error : null,
          isLoaded : false,
          searchlogs : []        
      };
    };

    componentDidMount() {
        fetch(`http://${HOST}/searchlog`)
        .then( response => response.json())
        .then( 
              (result) => {
                  this.setState({
                      isLoaded : true,
                      searchlogs : result,
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
          const {error, isLoaded, searchlogs} = this.state;

          if(error){
              return <div>Error in loading</div>
          }
          else if (!isLoaded) {
              return <div>Loading ...</div>
          }
          else if (searchlogs.length==0) {
              return<div>No records found</div>
          }
          else{
              return(                  
                  <div>
                      <ol>
                      {
                          this.state.searchlogs.map(searchlog => (
                              <li key={searchlog.search_id} align="start">
                                  <div>
                                      <p>IP Address: {searchlog.ipaddress}</p>
                                      <p>Time (Unix): {searchlog.searchtime}</p>
                                      <p>Starting</p>
                                      <p>Latitude: {searchlog.start_latitude}, Longitude: {searchlog.start_longitude}</p>
                                      <p>Destination</p>
                                      <p>Latitude: {searchlog.end_latitude}, Longitude: {searchlog.end_longitude}</p>
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