/*
 * MapBox
 *
 * Description:
 *
 * Props:
 *    userData - 
 *    onError - a function that runs when there is a validation error
 *    stationsCoor -
 *
 */

import React from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import {API_KEY} from '../API'

//import './Mapbox.css'
import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.

mapboxgl.accessToken = API_KEY

export default class Map extends React.Component {
  isMounted = false;

  constructor(props) {
		super(props);

		this.state = {
      directions: "",
      map: '',
      marker: '', 
      currentMarkers: []
  }
  }

componentDidUpdate(){
  this.removeMarkers();
  this.showRoute();
}

componentDidMount() {
      this.isMounted = true;

      this.state.map = new mapboxgl.Map({
        container: this.mapContainer, 
        style: 'mapbox://styles/mbuhaya/ck8uoff901jzv1ir0spc6gk99',
        center: [-82.907120, 40.417286],
        zoom: 6
      })
  
      this.state.directions = new MapboxDirections({
       accessToken: mapboxgl.accessToken,
        unit: 'imperial',
        profile: 'mapbox/driving',
        interactive: false,
        controls: false,
        styles: [{
          'id': 'directions-route-line-casing',
          'type': 'line',
          'source': 'directions',
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#2d5f99',
            'line-width': 5
          },
          'filter': ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']]
        }, {
          'id': 'directions-route-line',
          'type': 'line',
          'source': 'directions',
          'layout': {
            'line-cap': 'butt',
            'line-join': 'round'
          },
          'paint': {
            'line-color': {
              'property': 'congestion',
              'type': 'categorical',
              'default': '#4882c5',
              'stops': [['unknown', '#4882c5'], ['low', '#4882c5'], ['moderate', '#f09a46'], ['heavy', '#e34341'], ['severe', '#8b2342']]
            },
            'line-width': 5
          },
          'filter': ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']]
        },{
          'id': 'directions-origin-point',
          'type': 'circle',
          'source': 'directions',
          'paint': {
            'circle-radius': 13,
            'circle-color': '#228B22'
          },
          'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'A']]
        },{
          'id': 'directions-destination-point',
          'type': 'circle',
          'source': 'directions',
          'paint': {
            'circle-radius': 13,
            'circle-color': '#FF0000'
          },
          'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'B']]
        }]
      })
      
    this.state.map.addControl(this.state.directions);
    this.state.map.addControl(new mapboxgl.NavigationControl());
    this.state.map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    this.state.map.on('load', () => {
       this.removeMarkers()
       this.showRoute()
    });
  }

  /*
     * showRoute()
     *
     * Description: Uses the start and end addresses from indexPage.js to display
     *              the driving route on the mapbox map.
     * 
     * Arguments:
     *      N/A
     *
     * Returns:
     *      N/A
     */

  showRoute() {
    console.log(this.props.stationsCoor)
    const st = this.props.userData.startAddress;
    const en = this.props.userData.endAddress;
    this.state.directions.setOrigin(st);
    for( var i = 0; i < this.props.stationsCoor.length; i ++ ){
     //Add a marker at the same coordinates as the station that is visited along the train route
     this.state.marker = new mapboxgl.Marker().setLngLat([this.props.stationsCoor[i][1], this.props.stationsCoor[i][0]]).addTo(this.state.map)
     //Add the newly displayed marker to the currentMarkers array
     this.state.currentMarkers.push(this.state.marker)
    }
    this.state.directions.setDestination(en);
  }

  /* 
  * removeMarkers()
  *
  * Description: Removes the markers that were displayed for the previous route search.
  * 
  * Arguments: None
  * 
  * Returns: None. The function simply iterates through the currentMarkers array and removes the markers placed in it.
  */

  removeMarkers() {
    for( var i = this.state.currentMarkers.length - 1; i >= 0; i-- ){
      this.state.currentMarkers[i].remove();
    }
  }

  render () {
        return (
      <div>
        <div 
        ref={el => (this.mapContainer = el)} className="map"
        id="mapBox"
        width="50vw"
        height="50vh"
        >
      
        </div>
      </div>
    )
  }
}
